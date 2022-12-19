const mongoose = require("mongoose");
const Joi = require("joi");
const usermodel = require("./models/usersModel");

// const userSchema = new mongoose.Schema({
//     name :{type: String,required:true },
//     LastName :{type: String,required:true },
//     ID  :{type: String,required:true },
//     Dateofbirth :{type: String,required: true },
//     Residence  :{type: String,required:true },
// })

// const validUser=(bodyData)=>{
//     const joischma=Joi.object({
//         name:Joi.string().min(2).max(10).required,
//         LastName:Joi.string().min(2).max(10).required,
//         ID:Joi.string().min(2).max(10).required,
//         Dateofbirth:Joi.Date.required,
//         Residence:Joi.string().min(2).max(10).required,
//     })
//     return joischma.validate(bodyData)
// }

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// const usermodel = mongoose.model("users", userSchema);

exports.user = (app) => {
  app.get("/", async (req, res) => {
    let data = await usermodel.find({});
    res.json({ data: data });
  });

  app.post("/login", async (req, res) => {
    let data = await usermodel.findOne({ ID: req.body.id , name: req.body.name });
    console.log(data);
    if (!data) {
      res.status(401).json({ err: "User not found!" });
    } else {
      if (getAge(data.Dateofbirth) < 18) {
        res.status(401).json({
          err: "You are not yet 18 years old, you are not entitled to vote",
        });
      } 
      else if(!data.Suffrage){
        res.status(401).json({
          err: "A user has already voted",
        });
      }
      
      else {
        res.status(200).json({ data: data });
      }
    }
  });
//הוספת משתמשים חדשים 
  app.post("/", async (req, res) => {
  console.log("123");
  let data = await usermodel.findOne({ ID: req.body.ID});
  if(!data){
    let data2 = new usermodel(req.body);
    console.log(req.body);
    res.status(200).json({message : "User successfully registered !!!" });
    data2.save(function (err) {
      if (err) {
        res.status(400).json({ err: err });
      }
    });
  }
  else {  res.status(404).json({ err: "User already exists" }); }
  
  });

  app.post("/delete", async (req, res) => {
    await usermodel.deleteOne({ ID: req.body.id });
  });

  app.put("/", async (req, res) => {
    try {
      const re = await usermodel.findOneAndUpdate(
        { name: "Opel" },
        { name: req.body.name }
      );
      res.status(200).json({ data: re });
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
