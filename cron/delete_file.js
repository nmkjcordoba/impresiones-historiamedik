var cron = require('node-cron');
const fs = require('fs').promises
const path = require('path')


cron.schedule('0 30 23 * * *', () => {
    const FOLDER_TO_REMOVE = 'files'
    fs.readdir(FOLDER_TO_REMOVE)
    .then(files => {
      const unlinkPromises = files.map(file => {
        const filePath = path.join(FOLDER_TO_REMOVE, file)
        
        return fs.unlink(filePath)
      })
  
      return Promise.all(unlinkPromises)
    }).catch(err => {
      console.error(`Something wrong happened removing files of ${FOLDER_TO_REMOVE}: ${err}`)
    })
},
{
    timezone: "America/Bogota"
});

module.exports = {
    cron
}