const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//model
const bookModel = require('../Models/Books');

const dataManager = require('../DataManager/bookDataManager');


router.post('/setBook' , function (req ,res , next){

    const bookName = req.body['bookName'];
    const bookAbout = req.body['bookAbout'];
    const author = req.body['author'];

    const rate = req.body['rate'];
    const rateCount = req.body['rateCount'];
    const viewCount = req.body['viewCount'];
    const tags = req.body['tags'];
    const photo_background_URL = req.body['photo_background_URL'];

    const photo_URL = req.body['photo_URL'];



    const book = new bookModel({
        bookId : mongoose.Types.ObjectId(),
        bookName: bookName,
        bookAbout: bookAbout,
        author : author,
        rate : rate,
        rateCount : rateCount,
        viewCount : viewCount,
        tags : tags ,
        urls : {
            photo_background_URL : photo_background_URL,
            photo_URL : photo_URL
        }
    });
    book.save((err , data) => {
        if (err)
            console.log(err);

        res.json(data)
    })
});

router.get('/getAll' , (req, res, next) => {
    dataManager.getAll().then((data)=> {
        res.json(data);
    }).catch((err)=> {
        res.json({
            success : false,
            explain : "Bulunamadı"
        })
    })
});

router.get('/getById/:id' , (req, res, next) => {
    const id = req.params.id;
    bookModel.findById(id , (err,data)=>{
        if (err)
            res.send(err);
        else {
            res.json(data);
        }
    });
    // bunun  birde findOne versiyonu var o bişeyle karşılaitığında ilk bulduğunu getirir
});

router.get('/update' ,(req, res) => {
   bookModel.update(
       {
           viewCount : 1000
       },
       {
           viewCount : 2020
           //bookName : asd // eğer böyle bir kayıt yoksa upsert ile eklerken burada girilen değeri yeni olarak ekler
       },
       {
           multi: true // çoklu güncelleme yapmak için
           // upsert : true  eğer öyle bir kayıt yoksa kendi ekler
       },
       (err ,data ) => {
            res.json(data);
       }
   )
});

router.get('/updateById/:id' , (req, res) => {
    const id = req.params.id;
    bookModel.findByIdAndUpdate(id , {
        author : 'Hasan Özgür Elmaslı'
    }, (err,data) => {
            res.json(data);
        });
})
// birden fazla silme işlemi için remove
// findOneAndRemove kritere göre ilk bulduğu değeri siler
// find by id ile bulup silebilriz.


//SORT
router.get('/sortyByViewCount' ,(req, res) => {
    bookModel.find({ } , (err,data)=>{
        res.json(data);
    }).sort ({
            'viewCount': 1
    });
});


router.get('/getByPage/:pageNumber' ,(req, res) => {
    const pagenumber = req.params.pageNumber;
   bookModel.find({ } , (err,data) => {
       res.json(data);
   }).limit(1)
       .skip(2);
});


router.get('/search/:search' , (req ,res)=> {
    const text = req.params.search;
    dataManager.search(text)
    .then((data)=> {
        res.json(data);
    })
    .catch((error)=> {
        res.json({
            success : false,
            explain : error
        })
    })
});

router.get('/getComment/:bookId' , (req , res) =>{
    const bookId =  req.params.bookId;
    dataManager.getBookComments(bookId).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({
            success :false , 
            error : err
        })
    })
})

router.post('/setComment' , (req ,res) => {
    const userId  = req.body['userId'];
    const comment = req.body['comment'];
    const bookId = req.body['bookId'];

    dataManager.setBookComment(userId , bookId , comment)
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


router.get('/aggregate', (req, res) => {
   bookModel.aggregate([
           {
             $lookup:{
                 from:'users',
                 localField:'userID', // hangi key ile birleştirilecek
                 foreignField:'_id',// user tablosundan hangi key ile birleştirilecek
                 as:'users'
             }
           },
           {
                // hangi prop ların gelmesini istiyorsak
               $project: {
                   bookName:1,
                   viewCount :1
               }
           },
           {
               $sort : {
                   bookName : -1
               },
           }


               /*
               //gruplama
               $match: {
                   viewCount:1850,
               },
               // sayisi göstreme gibi özellikler için
               $group : {
                   _id:'$author',
                   kitapSayisi: { $sum : 1}
               }
                */

   ],
       (err,data) => {
                res.json(data);
       });
});

module.exports = router;


