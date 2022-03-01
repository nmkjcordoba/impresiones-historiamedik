var cron = require('node-cron');
const { ActualizarCita } = require('../controllers');



cron.schedule(' */240 * * * *', async () => {
    try {
        console.log("ejecutando a las :");
        console.log(new Date().toISOString())
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