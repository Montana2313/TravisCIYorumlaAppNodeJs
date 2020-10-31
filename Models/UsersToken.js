const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserToken = new Schema ({
    userId : {
        type : String ,
        required:  true,
        unique : true
    },
    token : {
        type : String , 
        required : true,
        unique : true
    }
})

module.exports = mongoose.model('UserToke',UserToken);