import { createSlice } from "@reduxjs/toolkit";
import { applyNodeChanges, applyEdgeChanges, addEdge } from "reactflow";

const initialState = {
  allWorkFlows: [],
  currWorkFlows: {
    id: null,
    _id: null,
    nodes: [],
    edges: [],
  },
};

export const counterSlice = createSlice({
  name: "reactFlow",
  initialState,
  reducers: {
    onNodesChange: (state, action) => {
      const changes = action.payload;
      state.currWorkFlows.nodes = applyNodeChanges(
        changes,
        state.currWorkFlows.nodes
      );
    },

    onEdgesChange: (state, action) => {
      const changes = action.payload;
      state.currWorkFlows.edges = applyEdgeChanges(
        changes,
        state.currWorkFlows.edges
      );
    },

    onConnect: (state, action) => {
      const connection = action.payload;
      state.currWorkFlows.edges = addEdge(
        connection,
        state.currWorkFlows.edges
      );
    },

    setNodes: (state, action) => {
      const node = action.payload;
      console.log(node);
      state.currWorkFlows.nodes.push(node);
    },

    saveCurrWorkFlow: (state, action) => {
      const existingObjIndex = state.allWorkFlows.findIndex(
        (wf) => wf.id === state.currWorkFlows.id
      );
      if (existingObjIndex !== -1) {
        state.allWorkFlows[existingObjIndex] = state.currWorkFlows;
      } else {
        state.allWorkFlows.push(state.currWorkFlows);
      }
    },

    fetchAllWorkFlows: (state, action) => {
      state.allWorkFlows = action.payload;
    },

    setCurrWorkFlows: (state, action) => {
      state.currWorkFlows = action.payload;
    },
    createNewWorkFlows: (state, action) => {
      state.currWorkFlows = {
        nodes: [],
        edges: [],
        id: action.payload,
        _id: action.payload,
      };
    },
  },
});

export const {
  onNodesChange,
  onConnect,
  onEdgesChange,
  setNodes,
  saveCurrWorkFlow,
  fetchAllWorkFlows,
  setCurrWorkFlows,
  createNewWorkFlows,
} = counterSlice.actions;

export default counterSlice.reducer;
