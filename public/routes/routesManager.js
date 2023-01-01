const mongoose = require("mongoose");
const managerModel = require("./models/managerModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

exports.manager = (app) => {
  app.post("/manager", async (req, res) => {
    console.log("manager");

    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "kobik1494@gmail.com",
    //     pass: "xclbqiomrqttpdfi",
    //   },
    // });
    // const mailOptions = {
    //   from: "kobik1494@gmail.com",
    //   to: "kobik1494@gmail.com",
    //   subject: "Sending Email using Node.js",
    //   text: "That was easy!",
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });

    //הצפנת הסיסמא לפעם הראשונה שהכנסתי סיסמא למנהל המערכת
    // let data2 = new managerModel(req.body);
    // data2.Password = await bcrypt.hash( data2.Password,10)

    // data2.save(function (err) {
    //     if (err) {
    //     res.status(400).json({ err: err });
    //     }
    //     })

    let data = await managerModel.findOne({ Username: req.body.Username });

    console.log(req.body.Password);
    if (!data) {
        console.log("9999");
    res.status(401).json({ message: "Manager not found!" });
    }
    else {
        bcrypt.compare(req.body.Password, data.Password, (err, respunse) => {
        if (err) {
        console.log(err);
        console.log("rrrrr");
        res.status(401).json({message: "passwords do not match" });
        }
        if (respunse) {
        console.log(respunse);
        console.log("hfehfehfe");

        res.status(200).json({ message: "manager found!" });
        }
    });
    }
  });
};
