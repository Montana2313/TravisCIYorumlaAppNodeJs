const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const Book_Comment_Schema = new Schema(
    {
        comment_by : {
            type :String,
            required : true
        },
        comment : {
            type : String ,
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


var comments = module.exports = mongoose.model('Book_Command',Book_Comment_Schema);


module.exports.getCommentById = async function (book_id) {
    return new Promise((resolve , rejecet) => {
        comments.find({
            commentToBookId : book_id
        } , (err , data) => {
            if (err) 
                reject(err);
            resolve(data);
        })
    })
}

module.exports.setComment = async function (userId , comment , book_id , isAuthor) {
    return new Promise((resolve , reject) => {
        const commentModel = new comments({
            comment_by : userId ,
            commentToBookId : book_id, 
            comment : comment,
            isAuthor : isAuthor
        })
        commentModel.save((err ,data) => {
            if (err) 
                reject(err);
            resolve(data);
        })
    })
}