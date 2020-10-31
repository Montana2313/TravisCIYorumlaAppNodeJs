const authorModel = require('../Models/Author');

class AuthorDataManager {

    async getAll(){
        return new Promise((resolve , reject) => {
            authorModel.find({} , (err , data) => {
                if (err)
                    reject(null);
                resolve(data);
            })
        })
    }
    async isUserAuthor(id){
        return new Promise((resolve , reject) => {
            authorModel.find({
                author_id : id
            } , (err , data) => {
                if (err)
                    reject(err);
                resolve(data);
            })
        })
    }
    async setAuthor(userId , name , desc , picURL){
        return new Promise((resolve , reject) => {
          const author = new authorModel({
              author_id : userId,
              author_name : name, 
              author_description : desc,
              author_photo_URL : picURL
          })  

          author.save((err ,data) => {
              if (err)
                 reject(err);
              resolve(data);
          })
        })
    }
 
    async updateDescription(id,desc){
        return new Promise((resolve , reject) => {
            authorModel.updateOne({
                author_id : id
            },{
                author_description : desc
            } , (err , data) => {
                if (err)
                     reject(err);
                 resolve(data);
            })
        })
    }

    async updatePhotoURL(id , url){
        return new Promise((resolve , reject) => {
            authorModel.updateOne({
                author_id : id
            },{
                author_photo_URL : url
            } , (err , data) => {
                if (err)
                     reject(err);
                 resolve(data);
            })
        })
    }
    



}




module.exports = new AuthorDataManager();