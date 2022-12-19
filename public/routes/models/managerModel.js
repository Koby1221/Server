const mongoose = require("mongoose");
const managerSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
});
module.exports = mongoose.model("managers", managerSchema);
