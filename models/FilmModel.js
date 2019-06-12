const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmSchema = new Schema({
    title: {
        type : String,
        required : true
    },
    primiereDate : {
        type : Date,
        required : true
    },
    time : {
        type : Number,
        required : true
    }, 
    file : {
        type : String,
        default : ''
    },
    trailer : {
        type : String,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    cinema : {
        type : Schema.Types.ObjectId,
        ref: 'cinema'
    },
    creationDate : {
        type : Date,
        default : Date.now()
    }
})

module.exports = {Film : mongoose.model('film',FilmSchema)};