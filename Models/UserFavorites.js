const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserFavorites = new Schema ({
    favoritesId : {
        type : String , 
        required :false,
        unique :true,
        default : mongoose.Types.ObjectId()
    },
    userId : {
        type : String ,
        required:  true,
        unique : false
    },
    bookId : {
        type : String , 
        required : true,
        unique : false
    }
})

module.exports = mongoose.model('UserFavorites',UserFavorites);