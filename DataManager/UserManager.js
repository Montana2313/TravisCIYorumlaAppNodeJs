const express = require('express');
const router = express.Router();
const dataManager = require('../DataManager/userDataManager');

router.post('/forgetPassword' , (req , res ) => {
    const user_id = req.body['userID'];
    const newPass = req.body['password'];
    dataManager.forgerPassword(user_id , newPass) 
    .then((data)=> {
        res.json({
            success:true,
            explain:'OK'
        })
    })
    .catch((error)=> {
        res.json({
            success:false,
            explain:'Hatalı istek'
        })
    })    
})

router.post('/signUp', (req, res) => {
    const name = req.body['name'];
    const surname = req.body['surname'];
    const email = req.body['email'];
    const password = req.body['password'];
    const photo_URL = req.body['photo_URL'];
    const isPremium = req.body['isPremium'];


    dataManager.signup(name , surname , email,password,photo_URL ,isPremium)
    .then((data)=>{
        res.json(data);
    })
    .catch((error)=>{
        res.json({
            success : false,
            explain : error
        });
    })
});

router.get('/signIn/:email/:password', (req, res) => {
   const email = req.params.email;
   const password = req.params.password;
   dataManager.signIn(email, password).then((data)=> {
       res.json(data);
   })
   .catch((err)=> {
         res.json({
            success : false,
            explain : 'Email / Şifre yanlış'
         });
   })
});

router.get('/getUserInfoById/:id' , (req,res) =>{
    const user_id = req.params.id;
    dataManager.getUserById(user_id)
    .then((data)=>{
        res.json(data);
    }).catch((error)=> {
        res.json({
            success :false,
            explain : 'UserId not found'
        })
    })
});

router.get('/getAll' , (req , res) => {
    dataManager.getAllUsers().then((data)=>{
        res.json(data);
    }).catch((error)=> {
        res.json({
            success : false , 
            explain : "Kullanıcı listesi bulunamadı"
        })
    })
})



module.exports = router;