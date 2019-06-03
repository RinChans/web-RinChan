const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentModel = new Schema({
    body : {
        type : String,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref: 'user'
    },
    commentIsApproved : {
        type : Boolean,
        default: false
    },
    creationDate : {
        type : Date,
        default : Date.now()
    }
});

module.exports = {Comment : mongoose.model('comment',CommentModel)};