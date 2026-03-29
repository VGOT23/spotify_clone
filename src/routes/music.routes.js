const express = require('express')
const musicController = require ('../controller/music.controller')
const router = express.Router();
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

router.post('/upload',upload.single("music"),musicController.createMusic)


module.exports = router;