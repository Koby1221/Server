
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: { type: String },
  LastName: { type: String},
  ID: { type: String },
  Dateofbirth: { type: Date},
  Residence: { type: String},
   Suffrage:{type:Boolean}
});
module.exports = mongoose.model("users", userSchema);
