const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CinemaModel = new Schema({
    title : {
        type : String,
        required : true
    },
    cineplex : {
        type : Schema.Types.ObjectId,
        ref:'cineplex'
    },
    typeCinema : {
        type : String,
        required : true
    },
    horizoncal : {
        type :Number,
        required: true,
        default: 1
    },
    vertical : {
        type : Number,
        require : true,
        default: 1
    }
})

module.exports = {Cinema : mongoose.model('cinema',CinemaModel)};