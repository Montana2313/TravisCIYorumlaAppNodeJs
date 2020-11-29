const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const UserSelection = new Schema(
    {
        selectionID : {
            type : String,
            required : false,
            default : mongoose.Types.ObjectId()
        },
        userID: {
            type : String,
            required : true
        },
        selections : {
            type : [String],
            required : true
        }
    }
)


const selections =  module.exports = mongoose.model('UsersSelections',UserSelection);

module.exports.setSelections = async function (userID , selections) {
    return new Promise((resolve , reject) => {
        const model = new selections({
            userID : userID , 
            selections : selections
        })
        model.save((err , data) => {
            if (err)
                reject(err);
            resolve(data)
        })
    })
}

module.exports.getSelectionByUserId = async function (userID) {
    return new Promise((resolve , reject) => {
        selections.findOne({
            userID : userID
        }, (err ,data) => {
            if (err)
                 reject(err);
            resolve(data);
        })
    })
}