const mongoose = require("mongoose");
const usermodel = require("./models/usersModel");
const ProductSchema = new mongoose.Schema({
  name: String,
  img: String,
  NumberOfVotes: Number,
});
const productmodel = mongoose.model("products", ProductSchema);

exports.product = (app) => {
  //הוספת מפלגות 
  app.post("/product", async (req, res) => {
    let data = await productmodel.findOne({ name: req.body.name});
    if(!data){
      let data2 = new productmodel(req.body);
      console.log(req.body);
      res.status(200).json({message : "מפלגה נרשמה בהצלחה !!!" });
      console.log("qqqq");
    data2.save();
    console.log("pppp");
  }
  else {  res.status(404).json({ err: "מפלגה כבר קיימת" }); }
});
  // מחיקת מפלגות 
  app.post("/deleteProduct", async (req, res) => {
    let Product =await productmodel.findOne({ name: req.body.name});
    
    if(!Product){
      res.status(404).json({ err: "מפלגה לא קיימת" });
    }
    else {
      await productmodel.deleteOne({ name: req.body.name });
      res.status(200).json({message:" מפלגה הוסרה בהצלחה"})
    }
    
  });
 
  
//לוח תוצאות 
  app.get("/homePage", async (req, res) => {
    let data = await productmodel.find({});
    res.json({ data: data });
  });

  //הוספת מס מצביעים למפלגה 
  app.post("/Numberofvotes", async (req, res) => {
    try {
      console.log("porsttttt");
      const product = await productmodel.findOne({ name: req.body.name });
      
      await productmodel.updateOne({ name: req.body.name }, {NumberOfVotes: product.NumberOfVotes+1});
      await res.send("123").status(200);
      
      //שינוי זכות הצבעה לבוחר שלא יצביע פעמיים 
      await usermodel.updateOne({ Fass: req.body.id},{Suffrage:false});
    } catch (err) {
      console.log(err);
      res.status(400).json({ err: err });
    }
  });
};
