const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const Book_Comment_Schema = new Schema(
    {
        comment_by : {
            type :String,
            required : true
        },
        commentToBookId : {
            type : String,
            required : true
        },
        commentAddedDate : {
            type :Date ,
            required : false,
            default : Date()
        },
        isAuthor : {
            type : Boolean , 
            required : true, 
            default : false
        }
    }
);


module.exports = mongoose.model('Book_Command',Book_Comment_Schema);