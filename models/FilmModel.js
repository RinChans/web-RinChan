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
<<<<<<< HEAD
    trailer : {
        type : String,
        required : true
    },
=======
>>>>>>> 3a2c671d82bdb3913390e8fec31e67262407053f
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