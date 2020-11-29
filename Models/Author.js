const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const AuthorSchema = new Schema(
    {
        author_id : {
            type  :String ,
            required : true
        },
        author_name : {
            type : String ,
            required : true
        },
        author_description : {
            type : String , 
            required : true , 
            default : ''
        },
        author_photo_URL : {
            type : String , 
            required :false
        },
    }
);


var authors = module.exports = mongoose.model('Author',AuthorSchema);


module.exports.getAll = async function () {
    return new Promise((resolve , reject) => {
        authors.find({} , (err, data) => {
            if (err)
               reject(null);
             resolve(data);
        })
    })
}

module.exports.isUserAuthor = async function (id) {
    return new Promise((resolve , reject) => {
        authors.find({
            author_id : id
        } , (err , data) => {
            if (err)
                reject(err);
            resolve(data);
        })
    })
}


module.exports.getAuthorByName = async function (name) {
    return new Promise((resolve ,reject) => {
        authors.findOne({
            author_name : name
        } , (err , data) =>{
            if (err)
                reject(err);
            resolve(data);
        })
    })
}

module.exports.setAuthor = async function (userId , name , desc , picURL) {
    return new Promise((resolve , reject) => {
          const author = new authors({
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

module.exports.updateDescription = async function (id,desc) {
    return new Promise((resolve , reject) => {
        authors.updateOne({
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

module.exports.updatePhotoURL = async function (id, url) {
    return new Promise((resolve , reject) => {
        authors.updateOne({
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