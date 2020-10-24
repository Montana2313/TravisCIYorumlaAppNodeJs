var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*
? zorunlu olmayan
* t den sonra koysak t den sonra ne yazarsak yazalaım o route da gidecektir.
+ soldaki ifadenin aynısı olmalıdır.
mesela values de valu+es yazdık . valuuuuuuuues yazsakda alttak route da girecektir.
 */

//router.all dersek de hertürlü http requesti alabilmezi sağlar
router.get('/values', function (req , res, next){
   res.send(degerler);
});
router.get('/values/:id/:username?' , (req, res) => {
    // "/values/:id/:username? ? demek bu alan gönderilmese de olur demekdir
    // params obje dönderir .objectname dersek de direk obje içersindeki değeri dönecektir.
    res.send(req.params);
    res.end();
});
router.post('/values', function (req , res, next){
    res.send(degerler);
});
const  degerler = {
  isim :'Özgür',
  soyisim : 'Elmaslı',
  meslek : 'Bilgisayar Mühendisi' ,
  lokasyon : {
    il : 'Ankara',
    ilçe : 'Altındağ'
  }
}
const friends  = [
  {isim : "Enes" , soyisim: "Erdoğan"}, { isim: "Bilinmiyor", soyisim: "Bilmem ne"}
]

const getCurrentUser = () => {
  return new Promise((resolve , reject) =>  {
    setTimeout(() => {
      resolve(degerler);
      // eğer rejcet eder isek catch e düşecektir.
    } , 1000);
  });
};
const getFriends = (username) => {
  return new Promise((resolve , reject) => {
    setTimeout(() => {
      resolve(friends);
      // eğer rejcet eder isek catch e düşecektir.
    } , 1000);
  });
};

getCurrentUser()
    .then((user)=> {
      return getFriends(user.isim);
    })
    .then( (friends)=> {
      console
          .log(friends);
    })

async function asenkronFunc(){
    try {
      const  user = await getCurrentUser();
      const  friends = await getFriends(user.isim);
      console.log(friends);
    }catch (error) {
      console.log(error);
    }
}


/*

//const  {isim , soyisim , lokasyon : {il}} = degerler

//const arr = ["Özgür","Elmaslı","Bilgisayar","Mühendisi"];

//const [name , surname , ...meslek] = arr;

const result = () =>{
  return "sa";
}

const asyncFunc = () => {
  return new Promise((resolve , reject) => {
    resolve("Selamlar");
  })
}
asyncFunc()
    .then((data) => {
      return 1;
    })
    .then((data) => {
      return "selam";
    })
    .then((data) => {
      console.log(data);
    })


function soyle(text , callback){
  console.log('asd');
  callback();
}
soyle('sea aq' , function (){
  console.log('ad');
});

*/
module.exports = router;
