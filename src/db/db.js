const mongoose = require('mongoose');

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("server connected to database")
    } catch (error) {
        console.log("Failed to connect with datab")
    }
}

module.exports = connectDB;