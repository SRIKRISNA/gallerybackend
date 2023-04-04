const express = require("express");
const app = express.Router();
const imgModel = require('../Models/Images');


// upload img
app.post("/add", (req,res) => {
    imgModel.create({
    label: req.body.label,
    image: req.body.image
    }).then(()=>{
        res.status(200).send("Uploaded...!!");
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

// delete img
app.delete("/delete/:_id", (req,res) => {
    imgModel.find({
    _id: req.params._id
    }).then(()=>{
        try{
            imgModel.deleteOne({_id:req.params._id}).then((img)=>{
                res.status(200).send("Deleted...!!");
            }).catch((err)=>{
                res.status(400).send(err);
            })
        }catch(err){
            res.status(400).send("not found img");
        }
    })
})

module.exports = app;