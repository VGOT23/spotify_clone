const express = require('express')
const musicController = require ('../controller/music.controller')
const router = express.Router();
const multer = require('multer');
const artistmiddleware = require('../middlewares/artist.middleware');
const upload = multer({ storage: multer.memoryStorage() })

router.post('/upload',artistmiddleware,upload.single("music"),musicController.createMusic)
router.post('/album',artistmiddleware,musicController.createalbum)


module.exports = router;