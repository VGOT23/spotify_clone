const express = require('express')
const musicController = require ('../controller/music.controller')
const router = express.Router();
const multer = require('multer');
const {artistmiddleware, authUser} = require('../middlewares/auth.middleware');
const upload = multer({ storage: multer.memoryStorage() })

router.post('/upload',artistmiddleware,upload.single("music"),musicController.createMusic)
router.post('/album',artistmiddleware,musicController.createalbum)
router.get('/allmusic',authUser,musicController.getAllmusic)
router.get('/album',authUser,musicController.getallAlbums)
router.get('/album/:id',authUser,musicController.getalbum)
module.exports = router;