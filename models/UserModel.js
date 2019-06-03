const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
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
    passwordConfig : {
        type : String,
        required:true
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

module.exports  = {User : mongoose.model('user',UserModel)};