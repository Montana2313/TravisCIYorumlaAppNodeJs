const isLogin = (req, res, next) => {
    const isLogin = false;
    if (isLogin) {
        next();
    }else {
        res.send('Giriş yap lan dingil');
    }
}

module.exports = isLogin;