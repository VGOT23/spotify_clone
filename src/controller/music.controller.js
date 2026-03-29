const musicModel = require('../models/music.model')
const jwt = require('jsonwebtoken')
const {uploadfile} = require('../services/storage.service')

async function createMusic(req,res) {
    const token = req.cookies.token;
    if( !token ){
        return res.status(401).json({
            message : "Unauthorised not registerd/login"
        })
    }
    const {title} = req.body
    const file = req.file
    try {
    const decoded = await jwt.verify(token,process.env.JWT_SECRET)
    if( decoded.role !== "artist"){
        return res.status(401).json({
            message : "You don't have access to upload music"
        })
    }
    const result = await uploadfile(file.buffer.toString('base64'))
    const music = await musicModel.create({
        uri : result.url,
        title,
        artist : decoded.id
    })
    res.status(201).json({
        message : "Music Uploaded",
        music : {
            name : music.title,
            url : music.uri, 
            artist : music.artist
        }
    })
        
    } catch (error) {
        return res.status(401).json({
            message : "Unauthroised"
        })
    }


}






module.exports = {createMusic}