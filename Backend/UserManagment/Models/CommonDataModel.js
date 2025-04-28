const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CommonSchema = new Schema({
  Key: { type: String, required: true },
  Value: { type: Array, required: true }
});
const CommonData = mongoose.model("CommonData", CommonSchema, "CommonDatas");
module.exports = CommonData;