const fs = require("fs");
const csv = require("csvtojson");
const { Parser } = require("json2csv");
const { default: axios } = require("axios");
const CSV = require("csv-string");
const jwt = require("jsonwebtoken");
function getNodesExecutionOrder(nodes, edges) {
  const visited = new Set();
  const executionOrder = [];

  function getNodeType(nodeId) {
    const node = nodes.find((node) => node.id === nodeId);
    return node.data.type;
  }

  function dfs(nodeId) {
    if (visited.has(nodeId)) return;
    if (getNodeType(nodeId) === "end") {
      executionOrder.push("end");
      return;
    }

    visited.add(nodeId);
    executionOrder.push(getNodeType(nodeId));
    const outgoingEdge = edges.find((edge) => edge.source === nodeId);

    if (outgoingEdge) {
      dfs(outgoingEdge.target);
    }
  }

  const startNode = nodes.find((node) => node.data.type === "start");
  const endNode = nodes.find((node) => node.data.type === "end");

  if (!startNode) {
    throw Error("There is no Start node");
  }
  if (!endNode) {
    throw Error("There is no End node");
  }

  dfs(startNode.id);

  return executionOrder;
}

async function convertCsvToJsonFromFilePath(csvFilePath) {
  const jsonArray = await csv().fromFile(csvFilePath);
  return jsonArray;
}

function waitNode(delayInSeconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Wait Node: Delay of ${delayInSeconds} seconds completed.`);
      resolve();
    }, delayInSeconds * 1000);
  });
}

async function toLowerCaseCsvColumn(csvData) {
  const jsonData = CSV.parse(csvData, {
    output: "objects",
  });

  const lowercaseJsonData = jsonData.map((obj) => {
    const newObj = {};
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        newObj[key] = obj[key].toLowerCase();
      }
    }
    return newObj;
  });
  const fields = Object.keys(lowercaseJsonData[0]);
  const json2csvParser = new Parser({ fields });
  const finalCsvData = json2csvParser.parse(lowercaseJsonData);

  return finalCsvData;
}

function convertCsvtoJson(csvData) {
  const jsonData = CSV.parse(csvData, {
    output: "objects",
  });

  return jsonData;
}

async function postDataNode(jsonData) {
  try {
    const res = await axios.post("https://requestcatcher.com/", jsonData);
    console.log("Successfully Post data");
    return res;
  } catch (error) {
    console.log(error);
  }
}

async function readInitCsvData(csvFilePath) {
  const jsonData = await convertCsvToJsonFromFilePath(csvFilePath);
  const fields = Object.keys(jsonData[0]);
  const json2csvParser = new Parser({ fields });
  const csvData = json2csvParser.parse(jsonData);

  return csvData;
}

async function executeAllAction(executionOrder, filepath) {
  console.log(executionOrder);
  let finalJsonData = {};
  let finalCsvData = await readInitCsvData(filepath);

  for (let i = 0; i < executionOrder.length; i++) {
    try {
      if (executionOrder[i] === "start") {
        console.log("start process");
      } else if (executionOrder[i] === "filter") {
        console.log("filter process");
        finalCsvData = await toLowerCaseCsvColumn(finalCsvData);
        console.log(finalCsvData);
      } else if (executionOrder[i] === "wait") {
        console.log("Wait process");
        await waitNode(5);
      } else if (executionOrder[i] === "POST") {
        console.log("post process");
        const res = await postDataNode(finalJsonData);
      } else if (executionOrder[i] === "end") {
        console.log("End process");
      } else if (executionOrder[i] === "convert") {
        console.log("Convert process");
        const parsedCsv = convertCsvtoJson(finalCsvData);
        finalJsonData = parsedCsv;
        console.log(finalJsonData);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // Attach the decoded user information to the request object
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(403).send("Not authorized!");
  }
};

module.exports = {
  getNodesExecutionOrder,
  executeAllAction,
  authenticateToken,
};
