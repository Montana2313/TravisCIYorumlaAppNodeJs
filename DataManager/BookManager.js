const express = require('express');
const router = express.Router();
//model
const bookModel = require('../Models/Books');
router.post('/setBook' , function (req ,res , next){
    const book = new bookModel({
        bookName:'Yeni Kitap Adı',
        bookAbout: 'Kitap açıklamaıs',
        author : 'Özgür Elmaslı',
        rate : 4.7,
        rateCount : 100,
        viewCount : 1000,
        tags : ['aksiyon', 'macera' , 'eğtim'] ,
        urls : {
            photo_background_URL : 'www.google.com',
            photo_URL : 'www.google.com'
        }
    });
    book.save((err , data) => {
        if (err)
            console.log(err);

        res.json(data)
    })
});

router.get('/getAll' , (req, res, next) => {
    bookModel.find({}, (err,data)=>{
        if (err)
            res.send(err);
        else {
            res.json(data);
        }
    });
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


