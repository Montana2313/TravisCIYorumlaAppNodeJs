
const bookModel = require('../Models/Books');

const bookComment = require('../Models/Book_Command');


const authorDataManager = require('../DataManager/authorDataManager');



class bookDataManager{


    constructor(){}


    async search(text){
        return new Promise((resolve , reject) =>{
            bookModel.find (
                {
                    bookName : {$regex :  text }
                },
                (err ,data) => {
                    if (err)
                          reject(err);
                    resolve(data);
                }
            )});
    }


    async getAll(){
        return new Promise((resolve , reject) =>{
            bookModel.find(
                {  }
                 , (err , data) => {
                if (err)
                    reject(null);
                resolve(data);
            })

        });
    }

    async getBookComments(bookId){
        return new Promise((resolve , reject) => {
            bookComment.find({
                commentToBookId : bookId
            } , (err , data) => {
                if (err) 
                    reject(err);
                resolve(data);
            })
        })
    }
    async setBookComment(user_id , bookId , comment){
        return new Promise((resolve , reject) => {
            authorDataManager.isUserAuthor(user_id).then((data) => {
                const commentModel = new bookComment({
                    comment_by : user_id ,
                    commentToBookId : bookId, 
                    comment : comment,
                    isAuthor : true
                })
                commentModel.save((err ,data) => {
                    if (err){
                        reject(null);
                    }
                    resolve(data);
                })
            }).catch((err) => {
                const comment = new bookComment({
                    comment_by : user_id ,
                    commentToBookId : bookId, 
                    comment : comment,
                    isAuthor : false
                })
                comment.save((err ,data) => {
                    if (err){
                        reject(null);
                    }
                    resolve(data);
                })

                
            })
            
        })
    }

}


module.exports = new bookDataManager();