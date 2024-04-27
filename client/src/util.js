import axios from "axios";

export const nodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Input" },
    position: { x: 250, y: 25 },
  },

  {
    id: "2",
    data: { label: "Default" },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output" },
    position: { x: 250, y: 250 },
  },
];

export const edges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
];

export function validateWorkflow(nodes) {
  const hasStartNode = nodes.some((node) => node.data.type === "start");
  const hasEndNode = nodes.some((node) => node.data.type === "end");

  if (!hasStartNode || !hasEndNode) {
    alert(
      "Please make sure to add a start and an end node to the workflow before saving."
    );
    return false;
  }

  return true;
}

export const buttonsNodes = [
  {
    label: "Start",
    action: "start",
  },
  {
    label: "Filter Data",
    action: "filter",
  },
  {
    label: "Wait",
    action: "wait",
  },
  {
    label: "Convert Format",
    action: "convert",
  },
  {
    label: "Send POST Request",
    action: "POST",
  },
  {
    label: "End",
    action: "end",
  },
];

export async function signInAPI(credentials) {
  try {
    const res = await axios.post("http://localhost:5000/signin", credentials);

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    if (error.response) {
      alert(error.response.data.error);
      console.log(error.response);
    }
    console.log(error);
    throw error;
  }
}

export async function signUpAPI(credentials) {
  try {
    const res = await axios.post("http://localhost:5000/signup", credentials);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    if (error.response) {
      alert(error.response.data.error);
      console.log(error.response);
    }

    throw error;
  }
}
