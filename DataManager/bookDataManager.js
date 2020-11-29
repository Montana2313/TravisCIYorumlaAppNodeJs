
const bookModel = require('../Models/Books');

const bookComment = require('../Models/Book_Command');


const authorDataManager = require('../DataManager/authorDataManager');
const userDataManager = require('../DataManager/userDataManager');
const mongoclient  =  require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";

class bookDataManager{


    constructor(){}


    async search(text){
        return new Promise((resolve , reject) =>{
            bookModel.search(text).then((data)=> {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        });
    }


    async getAll(){
        return new Promise((resolve , reject) =>{
            bookModel.getAll(
                {  }
                 , (err , data) => {
                if (err)
                    reject(null);
                resolve(data);
            })

        });
    }

    async getBooksByAuthor(name){
        return new Promise((resolve , reject) => {
            bookModel.getBooksByAuthor(name).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    async getBookComments(bookId){
        return new Promise((resolve , reject) => {
            bookComment.getCommentById(bookId).then((data) => {
                for (let item in data){
                    const id = data[item]['comment_by'];
                    userDataManager.getUserById(id).then((userInfo) => {
                        console.log(userInfo['name'] + " "+ userInfo['surname']);
                        data[item]['comment_by'] = userInfo['name'] + " "+ userInfo['surname'];
                    }).catch((err) => {
                        reject("hata");
                    })
                }
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    }
    async setBookComment(user_id , bookId , comment){
        return new Promise((resolve , reject) => {
            authorDataManager.isUserAuthor(user_id).then((data) => {
                bookComment.setComment(user_id , comment , bookId , true).then((data) => {
                    resolve(data)
                }).catch((err)=> {
                    reject(err)
                })
            }).catch((err) => {
                bookComment.setComment(user_id , comment , bookId , false).then((data) => {
                    resolve(data)
                }).catch((err)=> {
                    reject(err)
                })
          })
            
        })
    }

}


module.exports = new bookDataManager();