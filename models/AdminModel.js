const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        default: ''
    },
    creationDate : {
        type: Date,
        default : Date.now()
    }
});

module.exports  = {Admin : mongoose.model('admin',AdminSchema)};