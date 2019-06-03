const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : 'public'
    },
    description : {
        type : String,
        required :true
    },
    allowComment : {
        type : Boolean,
        default : false
    }, 
    file : {
        type : String,
        default : ''
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    category : {
        type : Schema.Types.ObjectId,
        ref: 'category'
    },
    comment : [
        {
            type : Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],  
    creationDate : {
        type : Date,
        default : Date.now()
    }
})

module.exports = {Post : mongoose.model('post',PostSchema)};