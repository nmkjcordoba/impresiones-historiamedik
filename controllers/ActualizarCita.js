const Variado = require("../resolver/Variado")

const UpdateTipoPacRIPS = async () => {
    try {
        //console.log("jssjjsj")
        const citas = await Variado.listCita();
        for (let index = 0; index < citas[0].length; index++) {
            const element = citas[0][index];
            
            await Variado.updateCita(element.id_cita,element.health_plan_id)
        }
    } catch (error) {
        console.log(error)
        
    }
    
}

module.exports = {
    UpdateTipoPacRIPS
}