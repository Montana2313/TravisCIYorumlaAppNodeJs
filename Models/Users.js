const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema (
    {
        userID : {
            type : String,
            required : false,
            default : mongoose.Types.ObjectId()
        },
        name: {
            type : String,
            require : true
        },
        surname: {
            type : String,
            require : true
        },
        email : {
            type : String ,
            require : true,
            unique : true
        },
        password: {
            type : String ,
            require: true
        },
        photo_URL : {
            type : String ,
            require : false,
        },
        isPremium : {
            type:Boolean,
            require : true,
            default : false
        }
    }



)


module.exports = mongoose.model('Users',UserSchema);