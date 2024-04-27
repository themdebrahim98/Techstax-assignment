import React, { useState } from "react";
import axios from "axios";
import "./RunWorkFlow.css";
import { useDispatch, useSelector } from "react-redux";
import DraggableFileInput from "../DraggableFileInput/DraggableFileInput";

function WorkflowRunner() {
  const state = useSelector((state) => state.reactFlow);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState("");
  const [executedStatus, setExecutedStatus] = useState("idle");

  const handleFileChange = (file) => {
    console.log(file);
    setSelectedFile(file);
  };

  const handleWorkflowChange = (event) => {
    setSelectedWorkflow(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    if (selectedWorkflow === "") {
      alert("Please select a workflow ID.");
      return;
    }

    setExecutedStatus("loading");
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("workflowId", selectedWorkflow);

    axios
      .post("http://localhost:5000/runworkflow", formData)
      .then((response) => {
        alert("Workflow executed successfully!");
        setSelectedFile(null);
        setSelectedWorkflow("");
        console.log(response.data);
      })
      .catch((error) => {
        alert("Error executing workflow:");
        console.log(error.message);
      })
      .finally(() => {
        setExecutedStatus("idle");
      });
  };

  const isExecuted = executedStatus === "loading";

  return (
    <div className="workflow-runner">
      <div className="workflow-runner-content">
        <form onSubmit={handleSubmit}>
          <DraggableFileInput
            onFileChange={handleFileChange}
            selectedFile={selectedFile}
          />
          <select
            value={selectedWorkflow}
            onChange={handleWorkflowChange}
            name="workflowId"
            // required
          >
            <option value={""}>Select workflow id</option>
            {state.allWorkFlows.map((wf) => (
              <option value={wf.id}>{wf.id}</option>
            ))}
          </select>
          <button type="submit" disabled={isExecuted}>
            {isExecuted ? "Executing..." : "Run Workflow"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default WorkflowRunner;
