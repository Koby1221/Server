const mongoose = require("mongoose");
const usermodel = require("./models/usersModel");
const ProductSchema = new mongoose.Schema({
  name: String,
  img: String,
  NumberOfVotes: Number,
});
const productmodel = mongoose.model("products", ProductSchema);

exports.product = (app) => {
  app.post("/product", async (req, res) => {
    let data = new productmodel(req.body);
    await data.save();
  });
  
  app.post("/deleteProduct", async (req, res) => {
    await productmodel.deleteOne({ name: req.body.name });
  });
 
  

  app.get("/homePage", async (req, res) => {
    let data = await productmodel.find({});
    res.json({ data: data });
  });

  app.post("/Numberofvotes", async (req, res) => {
    try {
      console.log("porsttttt");
      const re = await productmodel.findOne({ name: req.body.name });
      const ooooo = await productmodel.updateOne({ name: req.body.name }, {NumberOfVotes: re.NumberOfVotes+1});
      await res.send("123").status(200);
      const user = await productmodel.findOne({ID: req.body.id });
      await usermodel.updateOne({ ID: req.body.id},{Suffrage:false});
    } catch (err) {
      console.log(err);
      res.status(400).json({ err: err });
    }
  });
};
