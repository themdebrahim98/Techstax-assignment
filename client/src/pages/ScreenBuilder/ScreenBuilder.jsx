import React from "react";
import "./ScreenBuilder.css";
import ReactFlowWrapper from "../../components/ReactFlowWrapper/ReactFlowWrapper";
import { useDispatch, useSelector } from "react-redux";
import { saveCurrWorkFlow } from "../../redux/reactFlowSlice";
import axios from "axios";
import { buttonsNodes, validateWorkflow } from "../../util";

export default function ScreenBuilder() {
  const state = useSelector((state) => state.reactFlow);
  const dispatch = useDispatch();

  const handleSaveWorkFlows = async () => {
    if (!validateWorkflow(state.currWorkFlows.nodes)) {
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/createworkflow",
        state.currWorkFlows
      );

      if (res.status === 200) {
        dispatch(saveCurrWorkFlow());
        alert(res.data.message);
      } else {
        console.log("Unexpected status code:", res.status);
        alert("An unexpected error occurred while saving the workflow.");
      }
    } catch (error) {
      console.error("Error saving workflow:", error);
      alert(
        "An error occurred while saving the workflow. Please try again later."
      );
    }
  };

  return (
    <div className="screenBuilder">
      <div className="saveBtnWrapper">
        <button className="saveBtn" onClick={handleSaveWorkFlows}>
          Save workflow
        </button>
        <h2 className="workflowId"> Workflow Id : {state.currWorkFlows?.id}</h2>
      </div>
      <p>
        <b>Note:</b>To delete Node or Edge, select Node or Edge and enter
        backspace on keyboard.
      </p>
      <div className="screenBuilderWrapper">
        <div className="screenBuilderWrapperLeft">
          <div className="buttonGroup">
            {buttonsNodes.map((btn, idx) => (
              <button
                draggable={true}
                onDragStart={(event) => {
                  const action = event.target.getAttribute("data-action");
                  const label = event.target.textContent;
                  const jsonData = {
                    action,
                    label,
                  };

                  event.dataTransfer.setData(
                    "application/json",
                    JSON.stringify(jsonData)
                  );
                }}
                key={btn.action}
                className="styledButton"
                data-action={btn.action}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
        <div className="screenBuilderWrapperRight">
          <div className="reactFlowWrapper">
            <ReactFlowWrapper />
          </div>
        </div>
      </div>
    </div>
  );
}
