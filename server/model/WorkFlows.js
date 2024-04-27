const mongoose = require("mongoose");

const workFlowSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  nodes: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
  edges: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
});

const Workflow = mongoose.model("Workflow", workFlowSchema);

module.exports = {
  Workflow,
};
