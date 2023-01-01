const mongoose = require("mongoose");
const Joi = require("joi");
const usermodel = require("./models/usersModel");
const nodemailer = require("nodemailer");
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


  //כניסת משתמש למערכת תוך בדיקה אם קיים במערכת 
  app.post("/login", async (req, res) => {
    let data = await usermodel.findOne({ Fass: req.body.fass , name: req.body.name });
    console.log(data);
    if (!data) {
      res.status(401).json({ err: "משתמש או סיסמא לא נמצאים!" });
    } else {
      //בדיקה אם משתמש בן 18
      if (getAge(data.Dateofbirth) < 18) {
        res.status(401).json({
          err: "אינך עדיין בן 18, אינך זכאי להצביע",
        });
      } 
      //בדיקה אם משתמש כבר הצביע
      else if(!data.Suffrage){
        res.status(401).json({
          err: "משתמש יקר כבר מימשת את זכות ההצבעה שלך ",
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
  //בדיקה אם משתמש כבר קיים ואם לא קיים נכנס למערכת
  let data = await usermodel.findOne({ ID: req.body.ID});
  if(!data){
    let data2 = new usermodel(req.body);
    console.log(req.body);
    res.status(200).json({message : "המשתמש נרשם בהצלחה !!!" });
    data2.save(async function  (err) 
    {
      const arrS=[`a`,`b`,`c`,`d`,`e`,`f`,`g`,`h`,`i`,`j`,`k`,`l`,`m`,`n`,`o`,`p`,`q`,`r`,`s`,`t`,`u`,`v`,`w`,`x`,`y`,`z`]
      const arrL=[`A`,`B`,`C`,`D`,`E`,`F`,`G`,`H`,`I`,`J`,`K`,`L`,`M`,`N`,`O`,`P`,`Q`,`R`,`S`,`T`,`U`,`V`,`W`,`X`,`Y`,`Z`]
      const rnd1=Math.floor(Math.random() * 10000);
      const rnd2=Math.floor(Math.random() * 10000);
      const rnd3=Math.floor(Math.random() * 26);
      const rnd4=Math.floor(Math.random() * 26);
      const string="שלום וברכה הינך זכאי להצביע במערכת הבחירות הבאה מצורף קוד כניסה למערכת ";
      
       
      await usermodel.updateOne({ID: req.body.ID}, {Fass: rnd1+arrS[rnd3]+arrL[rnd4]+rnd2});

      const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
      user: "kobik1494@gmail.com",
      pass: "xclbqiomrqttpdfi",
      },
    });
    const mailOptions = {
      from: "kobik1494@gmail.com",
      to: req.body.Email,
      subject: "Sending Email using Node.js",
      text:  "שלום " +data2.name+" הינך זכאי/ת להצביע במערכת הבחירות הבאה נא להצטייד בתעודת זהות או דרכון בתוקף מצורף קוד כניסה למערכת    " + "\n" + rnd1+arrS[rnd3]+arrL[rnd4]+rnd2 
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
      
      if (err) {
        res.status(400).json({ err: err });
      }
    });
  }
  else {  res.status(404).json({ err: "משתמש כבר קיים" }); }
  
  });

  
  //מחיקת בוחרים
  app.post("/delete", async (req, res) => {
    let user =await usermodel.findOne({ ID: req.body.id});
    
    if(!user){
      res.status(404).json({ err: "משתמש לא קיים" });
    }
    else {
       await  usermodel.deleteOne({ID: req.body.id});
    res.status(200).json({message:"משתמש הוסר בהצלחה"})
    }
   
  });

};
