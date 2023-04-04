const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const ImageController = require('./Routes/Images');
const imgModel = require('./Models/Images');

const app = express();

app.use(express.json({limit: '30mb', extended:true}));
app.use(cors());
// app.use(express.urlencoded({extended:false}));

// database and server
const PORT = process.env.PORT || 5000;
const db = "mongodb+srv://krishna:spkrishna@krishnacluster.xjap0dj.mongodb.net/idream?retryWrites=true&w=majority";
mongoose.connect(db).then(()=>{
    app.listen(PORT, (err)=>{
        if(!err){
            console.log(`The Server running on ${PORT} and DB connected`);
        }
    })
}).catch((err)=>{
    console.log(err);
})

// images basic route to fetch data
app.get("/", (req, res) => {
    imgModel.find().sort({time: 1}).then((allImgs) => {
        res.status(200).send(allImgs);
        // res.sendFile("index.html");
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

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

app.use("/images", ImageController);