const express = require('express');
const router = express.Router();


const dataManager = require('../DataManager/authorDataManager');


router.get('/getAllAuthor' , (req ,res) => {
    dataManager.getAll().then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json({
            success :false , 
            error : err
        })
    })
})


router.post('/setAuthor' , (req ,res) => {
    const author_id = req.body['author_id'];
    const author_name = req.body['author_name'];
    const author_description = req.body['author_description'];
    const author_photo_URL = req.body['author_photo_URL'];

    dataManager.setAuthor(author_id ,author_name , author_description , author_photo_URL)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json({
            success :false ,
            error : err
        })
    })
})

router.post('/getAuthor'  , (req ,res) => {
    const author_name = req.body['author_name'];
    console.log(author_name);
    dataManager.getAuthorByName(author_name).then((data)=>{
        res.json(data);
    }).catch((err)=> {
        res.json({
            success :false ,
            error : err
        })
    })
})
module.exports = router;