const jwt = require('jsonwebtoken')

async function artistmiddleware(req,res,next) {
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message : "Unauthorised"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if( decoded.role !== "artist"){
            return res.status(401).json({
                message : "user don't allow to create album/music"
            })
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message : "Unauthorised"
        })
    }
}
async function authUser(req,res,next) {
    const token = req.cookies.token
    if( !token ) {
        return res.status(401).json({
            message : "Unauthorised"
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded
        if( decoded.role !== "user"){
            return res.status(401).json({
                message : "You don't have acess"
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            message : "Unauthorised"
        })
    }
}
module.exports = {artistmiddleware,authUser};