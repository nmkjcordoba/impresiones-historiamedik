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

const InsertAnexo = async (req, res) => {
    try {
        const pac = req.body.pac;
        const user_id = req.body.user_id;
        const file = req.body.file;
        const nombrearchivo = req.body.nombrearchivo;
        
        const nombre_estudio = req.body.nombre_estudio;
        const tipo_estudio = req.body.tipo_estudio;
        const detalle = req.body.detalle;
        
        let type = "i";
        let formatos = ["jpg","jpeg","bmp","png","gif"];
        let palabracortada ="."+nombrearchivo.split(".")[1];
        if(formatos.includes(nombrearchivo.split(".")[1])){
            type = "i";
        }else{
            type = "d";
        }
        const anexo = await Variado.insertAnexo(pac,user_id,file,nombrearchivo,palabracortada,nombre_estudio,tipo_estudio,detalle,type);
        res.status(200).json({anexo});
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    UpdateTipoPacRIPS,InsertAnexo
}