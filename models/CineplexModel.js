const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CineplexModel = new Schema({
    title :{
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    createDate : {
        type : Date,
        default : Date.now()
    }
});

module.exports = {Cineplex : mongoose.model('cineplex',CineplexModel)};