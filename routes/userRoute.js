const express = require('express');
const router = express.Router();

const dataManager = require('../DataManager/userDataManager');
const userSelections = require('../Models/UserSelections');

const bcryptJS = require('bcryptjs');


router.get('/' , (req , res ) => {
    res.send('Travis deneme _ 123');
})

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
   console.log(email);
   console.log(password);
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

router.get('/getFavorites/:id' , (req ,res)=>{
    const user_id = req.params.id;
    dataManager.getUserFavorites(user_id).then((data)=>{
        res.json(data);
    }).catch((error) => {
        res.json({
            success :false,
            explain : 'UserId not found'
        })
    })
})

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
//MARK:-> User Selections
router.get('/getSelections/:id' , (req ,res) => {
    const user_id = req.params.id;
    userSelections.getSelectionByUserId(user_id)
    .then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({
            success : false , 
            explain : "Kullanıcı listesi bulunamadı"
        })
    })
})

router.post('/setSelections' , (req ,res) => {
    const userID = req.body['userID'];
    const selections = req.body['selections'];

    userSelections.setSelections(userID , selections)
    .then((data) => {
        res.json(data);
    }).catch((err) =>{
        res.json({
            success : false , 
            explain : "Hata"
        })
    })
})

router.get('/deleteToken/:userId/:token' , (req ,res) => {
    const user_id = req.params.userId;
    const token = req.params.token;
    dataManager.removeUserToken(user_id , token).then((data) => {
        res.json({
            success : false , 
            explain : "OK"
        })
    }).catch((err) => {
        res.json({
            success : false , 
            explain : "Kullanıcı listesi bulunamadı"
        })
    })
})



module.exports = router;