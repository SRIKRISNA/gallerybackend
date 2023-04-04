const mongoose = require('mongoose');

const imgSchema = new mongoose.Schema({
    label:String,
    image:String
});

const imgModel = mongoose.model("img", imgSchema);
module.exports = imgModel;