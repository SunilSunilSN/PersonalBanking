const AuthenticationHandler = (...auths) => {
    return(req, res, next) => {
        const auth = req.user.auth;
        if(auths.includes(auth)){

        }
    }
}