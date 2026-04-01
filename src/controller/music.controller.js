const musicModel = require('../models/music.model')
const jwt = require('jsonwebtoken')
const {uploadfile} = require('../services/storage.service');
const albumModel = require('../models/album.model');

async function createMusic(req,res) {
    const {title} = req.body
    const file = req.file
    const decoded = req.user
    try {
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

async function createalbum(req,res) {
    const decoded = req.user;
    try {
        const {title,musicIds} = req.body;
        const album = await albumModel.create({
            title,
            artist : decoded.id,
            music : musicIds
        })
        res.status(201).json({
            message : "album created successfully",
            album :{
                title : album.title,
                artist : album.artist,
                music : album.music
            }
        })

    } catch (error) {
        return res.status(401).json({
            message : "unoauthorised"
        })
    }
}

async function getAllmusic(req,res) {
    const allmusic = await musicModel.find();
    res.status(200).json({
        message : "All the music fetched",
        allmusic
    })
}

module.exports = {createMusic,createalbum,getAllmusic}

