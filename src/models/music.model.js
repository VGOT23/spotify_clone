const mongoose = require('mongoose');

const musicScehma = new mongoose.Schema({
    uri : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    artist :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        require : true
    }
})

const musicModel = mongoose.model("music",musicScehma)

module.exports = musicModel