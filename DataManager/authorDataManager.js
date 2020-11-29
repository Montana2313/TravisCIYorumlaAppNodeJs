const authorModel = require('../Models/Author');

class AuthorDataManager {

    async getAll(){
        return new Promise((resolve , reject) => {
            authorModel.getAll().then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    }
    async isUserAuthor(id){
        return new Promise((resolve , reject) => {
            authorModel.isUserAuthor(id)
            .then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    async getAuthorByName(name){
        return new Promise((resolve ,reject) => {
            authorModel.getAuthorByName(name)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            })
        })
    }



    async setAuthor(userId , name , desc , picURL){
        return new Promise((resolve , reject) => {
          authorModel.setAuthor(userId, name,
            desc,picURL)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            })
        })
    }
 
    async updateDescription(id,desc){
        return new Promise((resolve , reject) => {
            authorModel.updateDescription(id,desc)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            })
        })
    }

    async updatePhotoURL(id , url){
        return new Promise((resolve , reject) => {
            authorModel.updatePhotoURL(id ,url)
            .then((data)=> {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            })
        })
    }
}




module.exports = new AuthorDataManager();