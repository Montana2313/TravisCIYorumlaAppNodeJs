const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema(
    {
        bookId : {
            type : String ,
            required : false,
            unique : true,
        },
        bookName :{
            type : String ,
            required : true,
            unique : true
        },
        bookAbout : String,
        author: String,
        rate : {
            type : Number,
            default : 0.0
        },
        rateCount :{
            type : Number,
            default : 0.0
        },
        viewCount :  {
            type : Number,
            default : 0.0
        },
        tags : {
            type : [String],
            default : [],
            required : true
        },
        urls : {
            photo_URL : String,
            photo_background_URL : String,
        }
    }
);


module.exports = mongoose.model('Books',BookSchema);