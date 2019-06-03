const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoryModel = new Schema({
    title : {
        type : String,
        required : true
    }
});

module.exports = {Category : mongoose.model('category',CategoryModel)};