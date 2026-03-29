const {ImageKit} = require('@imagekit/nodejs')

const client = new ImageKit({
    privateKey : process.env.IMAGE_KIT
}) 

async function uploadfile(file) {
    const res = await client.files.upload({
        file,
        fileName : 'music' + Date.now(),
        folder : "spotify-music"
    })
    return res;
}

module.exports = {uploadfile}