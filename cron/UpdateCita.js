var cron = require('node-cron');
const { ActualizarCita } = require('../controllers');



cron.schedule(' */60 * * * *', async () => {
    try {
        console.log("ejecutando")
        await ActualizarCita.UpdateTipoPacRIPS();
        console.log("termina")
    } catch (error) {
        console.log(error)
    }
    
},
{
    timezone: "America/Bogota"
});

module.exports = {
    cron
}