const express = require('express');
const router = express.Router();

const isLoginMiddleWare = require('../Helper/isLogin'); // Middle Ware

router.get('/signIn/:username/:password' , isLoginMiddleWare , ((req, res) => {
   res.send(req.params);
}));

router.get('/signUp/:username/:password' ,isLoginMiddleWare, ((req, res) => {
   res.send('Account has been created')
}));


module.exports = router;