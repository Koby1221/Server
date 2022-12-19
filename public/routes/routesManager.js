const mongoose = require("mongoose");
const managerModel = require("./models/managerModel");
const bcrypt = require("bcrypt");

exports.manager = (app) => {
  app.post("/manager", async (req, res) => {
    console.log("manager");

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
