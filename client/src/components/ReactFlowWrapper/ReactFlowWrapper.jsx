import React, { useEffect } from "react";
import "./ReactFlowWrapper.css";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  onConnect,
  onEdgesChange,
  onNodesChange,
  setCurrWorkFlows,
  setNodes,
} from "../../redux/reactFlowSlice";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";

export default function ReactFlowWrapper() {
  const params = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.reactFlow);

  const handleNodeChange = (change) => {
    dispatch(onNodesChange(change));
  };

  const handleEdgeChange = (change) => {
    dispatch(onEdgesChange(change));
  };

  const handleConnect = (connection) => {
    dispatch(onConnect(connection));
  };

  useEffect(() => {
    const currWorksFlows = state.allWorkFlows.filter(
      (wf) => wf.id === params.id
    );
    console.log(currWorksFlows);

    if (currWorksFlows.length > 0) {
      dispatch(setCurrWorkFlows(currWorksFlows[0]));
    } else {
      dispatch(
        setCurrWorkFlows({
          id: params.id,
          nodes: [],
          edges: [],
        })
      );
    }
  }, [params.id, state.currWorkFlows.length]);

  const onDrop = (event) => {
    event.preventDefault();
    const receivedObj = event.dataTransfer.getData("application/json");
    const { action, label } = JSON.parse(receivedObj);
    const id = nanoid().toString();
    let type = "default";
    if (action === "start") {
      type = "input";
    } else if (action === "end") {
      type = "output";
    }

    const containerRect = event.currentTarget.getBoundingClientRect();

    const newNode = {
      id,
      type: type,
      data: { label: label, type: action },
      position: {
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top,
      },
    };

    dispatch(setNodes(newNode));
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{ height: "100%" }} onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={state.currWorkFlows && state.currWorkFlows.nodes}
        edges={state.currWorkFlows && state.currWorkFlows.edges}
        onNodesChange={handleNodeChange}
        onEdgesChange={handleEdgeChange}
        onConnect={handleConnect}
        // fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
