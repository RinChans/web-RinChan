const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const ShowtimeModel = new Schema({
    film : {
        type : Schema.Types.ObjectId,
        ref : 'film'
    },
    cinema : {
        type : Schema.Types.ObjectId,
        ref : 'cinema'
    },
    begin : {
        type : Date,
        required : true
    },
    end : {
        type : Date,
        required : true
    },
    price : {
        type : Number,
        required : true
    }
});

module.exports = {Showtime : mongoose.model('showtime', ShowtimeModel)};