const { getAPIConfigRaw, updateWorkflowStep, validateWorkflowStep } = require("../Controllers/CommonControllers");
const {
  verifUser,
  generateOtp,
  validateOtp,
} = require("../Controllers/CustomControllers");
const CustomWorkFlows = {
  VERFIUSER: verifUser,
  GENERATEOTP: generateOtp,
  VALIDATEOTP: validateOtp,
};
const axios = require("axios");
require("../../SharedServices/Environments/loadEnvironment")();
const WorkFlowService = async (req, res) => {
  const { WorkFlowId, Step, username, otp, password } = req.body;
  const ConfigDatas = await getAPIConfigRaw();
  const WorkFlowList = ConfigDatas.find((el) => el["WorkFlowConfiguration"]).WorkFlowConfiguration;
  const APIConfigDetails = ConfigDatas.find((el) => el["APIConfigurations"]).APIConfigurations;
  const WorkFlowDetails = WorkFlowList[WorkFlowId];
  if(!WorkFlowDetails) return res.error(400).json({ success: false, message: "Invalid workflow" });
  if (!Step) return res.status(400).json({ success: false, message: "Step is required" });
  const stepDef = WorkFlowDetails.WorkFlows.find(flow => flow.Step === Step);
  if (!stepDef) return res.error("Invalid step for this workflow", 400);
  //await validateWorkflowStep(username, step, WorkFlowId, WorkFlowDetails.WorkFlows)
if (stepDef.ServiceType === "CUSTOM") {
  const fn = CustomWorkFlows[Step];
  if (!fn) return res.error(`Custom step '${Step}' not implemented`, 400);
  return fn(req, res);
}
if (stepDef.ServiceType === "DEFINED") {
  const api = APIConfigDetails?.[Step];
  if (!api) return res.error(`Defined API '${Step}' not found`, 400);

  try {
      const response = await axios({
      method: api.method,
      url: `http://${process.env.BASE_HOST}:${process.env.API_GATEWAY_PORT}${process.env[api.service]}${api.enpointurl}`,
      headers: api.headers,
      data: req.body,
      withCredentials: "include",
    });
    return res.success(`Called DEFINED API: ${Step}`, response.data.data, response.data.statusCode);
  } catch (error) {
    return res.error(
      error.response.data.message,
      error.response.data.statusCode,
    );
  }
}
};



module.exports = { WorkFlowService };
