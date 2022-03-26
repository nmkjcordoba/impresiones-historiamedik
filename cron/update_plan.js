var cron = require('node-cron');
const fs = require('fs')

const Variado = require('../resolver/Variado');

//0 23 * * 5 -> viernes a las 23 horas 
//0 2 * * 1 -> lunes a las 2 am
//0 23 * * 5,0 -> a las 23 horas los viernes y domingos

cron.schedule('10 * * * * *', async () => {
    try {
        console.log("ejecutando a las :");
        console.log(new Date().toISOString())

        if(new Date().getDay() == 5){//los viernes
            const user = await Variado.getUserPlan2();
            let text = user[0].map(el => el.user_id).join();
            
            fs.writeFile('./files/usuarios.txt', text, function (err) {
                if (err) console.log(err);
                console.log('Saved!');
                fs.readFile('./files/usuarios.txt','utf8', async (err, data) => {
                    if(err) {
                      console.log('error: ', err);
                    } else {                  
                        await Variado.updatePlanUser(data,1);
                    }
                    
                });
            });
            
        }

        if(new Date().getDay() == 0){//los domingos
            fs.readFile('./files/usuarios.txt','utf8', async (err, data) => {
                if(err) {
                  console.log('error: ', err);
                } else {
                    await Variado.updatePlanUser(data,2);
                }
                
            });
        }

        
        console.log("FINALIZAR");
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