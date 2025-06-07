const CommonModel = require("../Models/CommonDataModel");
const mongoose = require("mongoose");
const APIConfigSchema = new mongoose.Schema({}, { strict: false });
const APIConfigCon = mongoose.model("APIConfig", APIConfigSchema, "APIConfigs");
const getCommonData = async (req, res) => {
    const Key = req.body.Key;
    if (!Key) {
        return res.error("Key is required", 400);
    }
    const Data = await CommonModel.find({Key : Key});
    if (Data.length == 0) {
        return res.error("No Common Data Found", 400);
    }
    return res.success("Common Data Fetched Successfully", Data, 201);
};
const getSecurityParams = async () => {
  const Data = await CommonModel.find({Key : "SecurityParameters"});
  return Data[0].Value[0];
}
const getAPIConfigData = async (req, res) => {
    const Data = await APIConfigCon.find();
    if(Data.length == 0) {
       return res.success("Common Data Fetched Successfully", Data, 201); 
    }
    return res.success("Common Data Fetched Successfully", Data, 201); 
};
const getAPIConfigRaw = async () => {
    const Data = await APIConfigCon.find();
    return Data;
};
const updateWorkflowStep = async (username, step, WorkFlowId) => {
  const key = `workflow:${username}`;
  const workflow = JSON.parse(await client.get(key)) || {
    WorkFlowId,
    currentStep: null,
    stepsCompleted: [],
  };
  workflow.currentStep = step;
  if (!workflow.stepsCompleted.includes(step)) {
    workflow.stepsCompleted.push(step);
  }
  await client.setEx(key, 3600, JSON.stringify(workflow)); // 1 hour TTL
};
const validateWorkflowStep = async (username, step, WorkFlowId, workflowSteps) => {
  const key = `workflow:${username}`;
  const progress = JSON.parse(await client.get(key));
  if (!progress || progress.WorkFlowId !== WorkFlowId) {
    throw new Error("No workflow in progress");
  }
  const expectedNextStep = workflowSteps[progress.stepsCompleted.length]?.Step;
  if (expectedNextStep !== step) {
    throw new Error(`Invalid step order. Expected '${expectedNextStep}'`);
  }
};
module.exports = {getCommonData, getAPIConfigData, getAPIConfigRaw, updateWorkflowStep, validateWorkflowStep, getSecurityParams};
