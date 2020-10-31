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


module.exports = mongoose.model('Author',AuthorSchema);