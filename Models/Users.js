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
        },
        books : {
            type : [String] , 
            required : false,
            default : []
        }
    }



)


const userModel =  module.exports = mongoose.model('Users',UserSchema);

module.exports.getUserBooks = async function (userID) {
    return new Promise((resolve , reject) => {
        userModel.findOne({
            userID : userID
        } , 'books'  , (err ,data) => {
            if (err)
                 reject(err);
            resolve(data);
        })
    })
}

module.exports.signUp = async function (name , surname , email , password , photo_URL , isPremium) {
    return new Promise((resolve , reject) =>  {
        const model = new userModel({
            name : name,
            surname : surname,
            email : email,
            password : hash,
            photo_URL : photo_URL,
            isPremium : isPremium
        })

        model.save((err , data) => {
            if (err)
                reject(err);
            resolve(data)
        })
    })
}