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
                userModel.signUp(name,surname ,email , hash , photo_URL , isPremium)
                .then((data) => {
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
                }).catch((err) => {
                    reject(err);
                })
            }).catch((err) => {
                reject("Hata");
            })
        })
    }
 i 
    async signIn(email , password){  
        return new Promise((resolve , reject) => {
            userModel.findOne({ email : email}, (err , data) => {
                if (err) 
                    reject("Kullanıcı yok");
                const userPassword = data['password'];
                const userId = data['userID'];
                bcryptJS.compare(password , userPassword).then((result) => {
                    console.log("Kullanıcı şifre karşılaştırmaası");
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
            userModel.findOne({ userID : user_id } , (err,data) =>{
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

    async getUserFavorites(user_id){
        return new Promise((resolve , reject) => {
            userModel.getUserBooks(user_id)
            .then((data) => {resolve(data)})
            .catch((err) => {reject(err)})
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

    async removeUserToken(id , token){
        return new Promise((resolve , reject) => {
           tokenModel.findOneAndRemove({
            userId : id, 
            token : token
           } , (err , data) => {
                     if (err)
                        reject(err);
                    resolve(data);
           })
        })
    }
}


module.exports = new userDataManager();