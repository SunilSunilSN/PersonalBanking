const CommonModel = require("../Models/CommonDataModel");
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
module.exports = {getCommonData};
