const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { Workflow } = require("./model/WorkFlows");
const multer = require("multer");
var jwt = require("jsonwebtoken");
const {
  getNodesExecutionOrder,
  executeAllAction,
  authenticateToken,
} = require("./util");
const User = require("./model/User");

dotenv.config();
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.body.workflowId, "check");
    return cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

app.post("/createworkflow", async (req, res) => {
  try {
    const isExistWorkFlow = await Workflow.find({ id: req.body.id });

    if (isExistWorkFlow.length <= 0) {
      const workflow = new Workflow({
        ...req.body,
      });
      await workflow.save();
      res.status(200).json({
        message: "Successfully created workflow!",
        data: req.body,
      });
    } else {
      const updatedWorkflow = await Workflow.findOneAndReplace(
        { id: req.body.id },
        req.body,
        { new: true }
      );
      res.status(200).json({
        message: "Workflow updated successfully!",
        data: updatedWorkflow,
      });
    }
  } catch (error) {
    console.error("Error creating or updating workflow:", error);
    res.status(500).json({
      message: "An error occurred while creating or updating workflow",
      error: error.message,
    });
  }
});

app.get("/allworkflows", async (req, res) => {
  try {
    const workflows = await Workflow.find({});
    res.status(200).json({
      workflows: workflows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.post(
  "/runworkflow",
  authenticateToken,
  upload.single("file"),
  async (req, res) => {
    try {
      const file = req.file;
      const workflowId = req.body.workflowId;
      const getWorkFlow = await Workflow.findOne({ id: workflowId });
      const executionOrder = getNodesExecutionOrder(
        getWorkFlow.nodes,
        getWorkFlow.edges
      );
      await executeAllAction(executionOrder, `uploads/${file.originalname}`);

      if (!file) {
        return res.status(400).send("No file uploaded.");
      }
      res.status(200).json({ message: "Uploaded", data: executionOrder });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
);

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    var token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({
      token,
      user: {
        email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }
    const user = new User({
      email,
      password,
    });
    await user.save();
    let token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({
      token,
      user: {
        email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
