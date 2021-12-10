const ImpresionResolver = require('../resolver/ImpresionResolver');
var { constancia, preescripcion, procedimientos, recomendaciones, incapacidad, historia, plantillaPrincipal} = require('../plantillas');
const impirmir = async (req, res) => {
    var pdf = require('html-pdf');

    
    const r = req.params.r;
    const enc = req.params.encounter;
    const uuid = req.params.uuid;
    const pac = req.params.pac == 0? '':req.params.pac;
    const cita = req.params.cita;
    const provider_id = req.params.provider_id;
    var contenido = plantillaPrincipal("Sin datos","<span>No hay datos</span>");
    
    try {
        if(r == "CONSTANCIA"){
            contenido = constancia
        }
        if(r == "PRESCRIPCION"){
            let response = await fn_preescripcion(pac,enc,uuid,provider_id);
            
            let presc = response.reportePreescripcion[0][0]
            contenido =  
            plantillaPrincipal(
                'PRESCRIPCION',
                preescripcion(presc.drug_name,presc.dosage,presc.quantity,presc.dose,presc.units,presc.route,presc.frequency,presc.duration)
            );
            
        }
        if(r == "INCAPACIDAD"){
            contenido = incapacidad;
        }
        if(r == "PROCEDIMIENTOS"){
            contenido = procedimientos;
        }
        if(r == "RECOMENDACIONES"){
            contenido = recomendaciones;
        }
        if(r == "HISTORIA"){
            contenido = historia
        }
        
        pdf.create(contenido).toFile(`./netmedik${enc}.pdf`, function(err, resp) {
            if (err){
                console.log(err);
               
            } else {
                res.status(200).json({resp});
                console.log(resp);
                
            }
        });
       
    } catch (error) {
        res.status(500).json(error);
    }
}

const fn_preescripcion = async (pac, enc, uuid, provider_id) => {
    const datosProvider = await ImpresionResolver.sp_reporte_datos_provider(provider_id,enc);
    const reportePreescripcion = await ImpresionResolver.sp_reporte_prescripcion(enc,null,pac);
    if(uuid == null){
        reportePreescripcion = await ImpresionResolver.sp_reporte_prescripcion(null,uuid,pac);
    }
    const patient_id = await ImpresionResolver.getEncounter(enc);
    const datosPaciente = await ImpresionResolver.sp_reporte_datos_paciente(enc,patient_id[0][0]["patient_id"]);
    const firma2 = await ImpresionResolver.Usp_Carga_2da_Firma(enc);
    return {datosProvider,reportePreescripcion,patient_id,datosPaciente,firma2}
}

const fn_incapacidad = async (pac, enc, uuid, provider_id) => {
    const datosProvider = await ImpresionResolver.sp_reporte_datos_provider(provider_id,enc);
    const reporteIncapacidad = await ImpresionResolver.sp_reporte_incapacidad(pac,enc,uuid);
    if(uuid != null){
        reporteIncapacidad = await ImpresionResolver.sp_reporte_incapacidad(pac,null,uuid);
    }
    const patient_id = await ImpresionResolver.getEncounter(enc);
    const datosPaciente = await ImpresionResolver.sp_reporte_datos_paciente(enc,patient_id[0]["patient_id"]);
    const firma2 = await ImpresionResolver.Usp_Carga_2da_Firma(enc);
}

const fn_procedimientos = async (pac, enc, uuid, provider_id) => {
    const datosProvider = await ImpresionResolver.sp_reporte_datos_provider(provider_id,enc);
    const reporteProcedimientos = await ImpresionResolver.sp_reporte_procedimientos(pac,enc,uuid);
    if(uuid != null){
        reporteProcedimientos = await ImpresionResolver.sp_reporte_procedimientos(pac,null,uuid);
    }
    const patient_id = await ImpresionResolver.getEncounter(enc);
    const datosPaciente = await ImpresionResolver.sp_reporte_datos_paciente(enc,patient_id[0]["patient_id"]);
    const firma2 = await ImpresionResolver.Usp_Carga_2da_Firma(enc);
}

const fn_recomendaciones = async (pac, enc, uuid, provider_id) => {
    const datosProvider = await ImpresionResolver.sp_reporte_datos_provider(provider_id,enc);
    const reporteRecomendaciones = await ImpresionResolver.sp_reporte_otros(pac,enc,uuid);
    if(uuid != null){
        reporteRecomendaciones = await ImpresionResolver.sp_reporte_otros(pac,null,uuid);
    }
    const patient_id = await ImpresionResolver.getEncounter(enc);
    const datosPaciente = await ImpresionResolver.sp_reporte_datos_paciente(enc,patient_id[0]["patient_id"]);
    const firma2 = await ImpresionResolver.Usp_Carga_2da_Firma(enc);
}

module.exports = {
    impirmir
}