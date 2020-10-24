const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const dotnet = require('dotenv');
const indexRouter = require('./routes/index');
const signInRouter = require('./routes/accountManager');

//
const booksRouter = require('./DataManager/BookManager');
const usersRouter = require('./DataManager/UserManager');

const app = express();

dotnet.config()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(body_parser.json());


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/yorumladatabase' ,{ useNewUrlParser: true } , { useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo db bağlantısı gerçekleşti.')
    })
    .catch((err) => {
      console.log('Hata gerçekleşti')
    });

//:-> middleware kısmı
// İlk parametre hangi url üzerinden yapılacağı (eğer bişey yazılmaz ise tüm hepsi için alacaktır.)
/*
const isLoginMiddleWare = require('./Helper/isLogin');

app.use(isLoginMiddleWare); // tüm için böyle yada istenen yerin içersinde çağırabiliriz.

app.use((err , req , res ,next ) => {
   res.status(err.statusCode);
   res.render('error' , {
        message:err.statusMessage,
        statusCode: err.statusCode
   });
});
 */
app.use('/', indexRouter);
app.use('/users',usersRouter);
app.use('/account',signInRouter);
app.use('/books',booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
const port = process.env.PORT || 4000;

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//app.listen(port);


module.exports = app;
