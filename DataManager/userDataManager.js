//model
const userModel = require('../Models/Users');
const tokenModel = require('../Models/UsersToken');


const bcryptJS = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
            bcryptJS.hash(password , 10).then((hash) => {
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
                        reject("Hata");
                    
                    const userId = data['userID'];
                    const payLoad = {
                        email
                    };
                    const token = jwt.sign(payLoad , 'yorumlaAppAPIWebtokenKey')
                    this.setUserToken(userId , token).then((data) => {
                        const json = JSON.parse(JSON.stringify(data));
                        json.userToken = token
                        resolve(json);
                    }).catch((err) => {
                        reject("Hata");
                    })
                })
            }).catch((err) => {
                reject("Hata");
            })
        })
    }

    async signIn(email , password){
        return new Promise((resolve , reject) => {
            userModel.findOne({ email : email}, (err , data) => {
                if (err) 
                    reject("Kullanıcı yok");
                const userPassword = data['password'];
                const userId = data['userID'];
                bcryptJS.compare(password , userPassword).then((result) => {
                    console.log(result);
                    if (result == true) {
                         const payLoad = {
                            email
                         };
                         const token = jwt.sign(payLoad , "yorumlaAppAPIWebtokenKey" , {
                            // expiresIn : 720
                         })
                         this.setUserToken(userId , token).then((res)=>{
                            const json = JSON.parse(JSON.stringify(data)); 
                            json.userToken = token                       
                            resolve(json);
                         }).catch((err) => {
                             console.log(err);
                            reject("Hata");
                         })
                        
                    }else {
                        reject("Hata");
                    }
                }).catch((err) => {
                    console.log(err);
                    reject("Hata");
                })
            })
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


    async setUserToken(id , userToken){
        return new Promise((resolve , reject) => {
            const model = new tokenModel({
                userId : id,
                token :userToken
            })
            model.save((err , data) => {
                if (err)
                    reject(err);
                resolve(data);
            }) 
        })
    }
}


module.exports = new userDataManager();