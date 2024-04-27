import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllWorkFlows } from "../../redux/reactFlowSlice";
import { nanoid } from "nanoid";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.reactFlow);
  const [selectedWorkFlow, setSelectedWorkFlow] = useState(null);

  const handleSelectChange = (e) => {
    const id = e.target.value;
    setSelectedWorkFlow(id);
  };

  useEffect(() => {
    const getAllWorkFlows = async () => {
      const res = await axios.get("http://localhost:5000/allworkflows");
      console.log(res.data.workflows);
      dispatch(fetchAllWorkFlows(res.data.workflows));
    };

    getAllWorkFlows();
  }, []);

  const handleCreateNewWorkFlow = () => {
    const id = nanoid();
    navigate(`/screenbuilder/${id}`);
  };

  return (
    <div className="home-container">
      <h1 className="title">Home</h1>

      <div className="workflow-container">
        <h2 className="subtitle">Select Existing Workflow:</h2>
        <div className="workflow-container-wrapper">
          <select className="select-box" onChange={handleSelectChange}>
            <option value="">Select Workflow</option>
            {state.allWorkFlows.map((workflow) => (
              <option key={workflow.id} value={workflow.id}>
                {workflow.id}
              </option>
            ))}
          </select>
          <div className="buttons-container">
            {selectedWorkFlow && (
              <Link to={`/screenbuilder/${selectedWorkFlow}`}>
                <button className="create-button">Open Workflow</button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div>
        <button className="create-button" onClick={handleCreateNewWorkFlow}>
          Create new workflow
        </button>
      </div>
      <div>
        <Link to={"/runworkflow"}>
          <button className="create-button">Run Workflow</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
