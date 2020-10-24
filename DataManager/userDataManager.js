//model
const userModel = require('../Models/Users');




class userDataManager{



    constructor(){}


    async forgerPassword(userId , newPassword){
        return new Promise((resolve , reject) => {
            userModel.updateOne({
                _id :  userId
            },
            {
                password : newPassword
            },
            (err, data)=>{
                if (err)
                    reject("Hata");
                resolve(data);
            });
        })
    }

    async signup(name , surname , email , password , photo_URL , isPremium){
        return new Promise((resolve , reject) => {
            const model = new userModel({
                name : name,
                surname : surname,
                email : email,
                password : password,
                photo_URL : photo_URL,
                isPremium : isPremium
            })
            console.log(name);
            model.save((err , data) => {
                if (err)
                    reject("Hata");
                resolve(data);
            })
        })
    }

    async signIn(email , password){
        return new Promise((resolve , reject) => {
            userModel.findOne({ email : email , password:password } , (err,data) => {
                if (err)
                     reject("Hata");
                 resolve(data);
             });
        })
    }
    async getUserById(user_id){
        return new Promise((resolve , reject) => {
            userModel.findById(user_id , (err,data) =>{
                if (err)
                    reject("Hata");
                 resolve(data);
            });
        })
    }


    async getAllUsers(){
        return new Promise((resolve , reject) =>{
            userModel.find({} , (err, data) => {
                if (err)
                    reject("Hata");
                resolve(data);
            })
        })
    }
}


module.exports = new userDataManager();