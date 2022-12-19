const arr = require("../../data/shop");
const mongoose = require("mongoose");
const Joi = require("joi");
const { status } = require("express/lib/response");
const { user } = require("./users");
const { product } = require("./routesProduct");
const { manager } = require("./routesManager");
const managerModel = require("./models/managerModel");

// const userSchema = new mongoose.Schema({
//   name: String,
//   color: String,
//   price: Number,
//   yad: String,
//   km: Number,
//   year: Number,
//   phone: String,
// });

// const userSchema = new mongoose.Schema({
//   name : String,
//   LastName : String,
//   ID : String,
//   Dateofbirth:Date,
//   Residence : String
// })

// const usermodel = mongoose.model("users", userSchema);

// const validcar=(bodyData)=>{
//     const joischma=Joi.object({
//         name:Joi.string().min(2).max(10).required,
//         color:Joi.string().min(2).max(10),
//         price:Joi.string().min(2).max(10),
//         yad:Joi.string().min(2).max(10),
//         km:Joi.string().min(2).max(10),
//         year:Joi.string().min(2).max(10),
//         phone:Joi.string().min(2).max(10).required,
//     })
//     return joischma.validate(bodyData)
// }

exports.routesInit = (app) => {
  user(app);
  product(app);
  manager(app);
  //  app.get("/", async (req, res) => {
  //   let data = await usermodel.find({});
  //  res.json({data: data});
  //  });

  // app.post("/login", async (req, res) => {
  //   let data = await usermodel.findOne({ID:req.body.id});
  //   if (!data) {
  //     res.status(401).json({err: "User not found!"});
  //   }
  //   else {
  //     res.status(200).json({data: data});
  //   }
  // });

  // app.post("/", async (req, res) => {
  //   // let chang=validcar(req.body)
  //   //     if(chang.error){
  //   // return res.status(404).json(chang.error.details)
  //   //     }
  //   let data = new usermodel(req.body);
  //   await data.save();
  // });

  // app.delete("/", async (req, res) => {
  //   await usermodel.deleteOne({ name: "kobi"});
  // });

  // app.post("/delete", async (req, res) => {
  //   await usermodel.deleteOne({ ID: req.body.id});
  // });

  // app.put("/", async (req, res) => {
  //   try {
  //     const re = await usermodel.findOneAndUpdate({ name: "Opel" }, {name: req.body.name});
  //     res.status(200).json({ data: re });
  //   } catch (err) {
  //     res.status(400).send(err);
  //   }
  // });

  // app.get("/shop",(req,res)=>{
  //     let cayegory=req.query.kobi
  //     console.log(arr);
  //      let arrTemp =arr.prods_ar.filter(item =>
  //       item.cat==cayegory
  //      )
  //     // res.json( {"HAEH": cayegory})
  //     console.log(arrTemp);
  //     res.json(arrTemp)
  // })

  // app.get("/category",(req,res)=>{
  //     res.json(arr)
  // })
};
