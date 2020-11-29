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


var Books = module.exports = mongoose.model('Books',BookSchema);


module.exports.getAll = async function () {
    return new Promise((resolve , reject) => {
        Books.find({} , (err , data) => {
            if (err) 
                reject("Hata");
            resolve(data);
        })
    })
}

module.exports.getById = async function (id) {
    return new Promise((resolve , reject) => {
        Books.find({bookId : id} , (err , data) => {
            if (err) 
                reject("Hata");
            resolve(data);
        })
    })
}

module.exports.search = async function (text) {
    return new Promise((resolve , reject) => {
        Books.find({
            bookName : {$regex :  text }
        } , (err , data) => {
            if (err)
                reject(err);
            resolve(data);
        })
    })
}

module.exports.getBooksByAuthor = async function(name) {
    return new Promise((resolve , reject) => {
        Books.find({
            author : name
        } , (err , data) => {
            if (err)
                reject(err);
            resolve(data);
        })
    })    
}