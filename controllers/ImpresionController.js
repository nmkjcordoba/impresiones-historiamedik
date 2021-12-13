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
            let presc = response.reportePreescripcion[0][0];
            contenido =  
            plantillaPrincipal(
                'PRESCRIPCION',
                preescripcion(presc.drug_name,presc.dosage,presc.quantity,presc.dose,presc.units,presc.route,presc.frequency,presc.duration)
            );

            let paciente = response.datosPaciente[0][0];            
            contenido = contenido.replace("@fecha",new Date().toLocaleDateString("en-US").toString());
            contenido = contenido.replace("@nombreCompleto",paciente.nombreCompleto);
            contenido = contenido.replace("@tipo_identificacion",paciente.tipo_identificacion);
            contenido = contenido.replace("@identificacion",paciente.identificacion);
            contenido = contenido.replace("@genero",paciente.genero);
            contenido = contenido.replace("@edad",paciente.edad);
            contenido = contenido.replace("@EstadoCivil",paciente.EstadoCivil);
            contenido = contenido.replace("@Telefono",paciente.Telefono);
            contenido = contenido.replace("@Telefono2",paciente.Telefono2);
            contenido = contenido.replace("@Direccion",paciente.Direccion);
            contenido = contenido.replace("@TipoAfiliacion",paciente.TipoAfiliacion);
            contenido = contenido.replace("@eps",paciente.eps);
            contenido = contenido.replace("@diagnostico",paciente.diagnostico);
            contenido = contenido.replace("@cup",paciente.cup);
            
            let d_provider = response.datosProvider[0][0];
            contenido = contenido.replace("@nombres",d_provider.nombres);
            contenido = contenido.replace("@identifier",d_provider.identifier);
            contenido = contenido.replace("@fecha_encuentro",new Date(d_provider.fecha_encuentro).toLocaleDateString("en-US",{hour:"numeric",minute:"numeric"}).toString());
            contenido = contenido.replace("@logo",d_provider.logo.toString('base64'));
            contenido = contenido.replace("@firma",d_provider.firma.toString('base64'));
            contenido = contenido.replace("@profesiones",d_provider.profesiones);

        }
        if(r == "INCAPACIDAD"){
            let response = await fn_incapacidad(pac,enc,uuid,provider_id)
            let incap = response.reporteIncapacidad[0][0];
            contenido = 
            plantillaPrincipal(
                'Orden Incapacidad',
                incapacidad(incap.description,incap.start_date,incap.auto_expire_date,incap.Dias,incap.instructions)
            )
            let paciente = response.datosPaciente[0][0];            
            contenido = contenido.replace("@fecha",new Date().toLocaleDateString("en-US").toString());
            contenido = contenido.replace("@nombreCompleto",paciente.nombreCompleto);
            contenido = contenido.replace("@tipo_identificacion",paciente.tipo_identificacion);
            contenido = contenido.replace("@identificacion",paciente.identificacion);
            contenido = contenido.replace("@genero",paciente.genero);
            contenido = contenido.replace("@edad",paciente.edad);
            contenido = contenido.replace("@EstadoCivil",paciente.EstadoCivil);
            contenido = contenido.replace("@Telefono",paciente.Telefono);
            contenido = contenido.replace("@Telefono2",paciente.Telefono2);
            contenido = contenido.replace("@Direccion",paciente.Direccion);
            contenido = contenido.replace("@TipoAfiliacion",paciente.TipoAfiliacion);
            contenido = contenido.replace("@eps",paciente.eps);
            contenido = contenido.replace("@diagnostico",paciente.diagnostico);
            contenido = contenido.replace("@cup",paciente.cup);
            
            let d_provider = response.datosProvider[0][0];
            contenido = contenido.replace("@nombres",d_provider.nombres);
            contenido = contenido.replace("@identifier",d_provider.identifier);
            contenido = contenido.replace("@fecha_encuentro",new Date(d_provider.fecha_encuentro).toLocaleDateString("en-US",{hour:"numeric",minute:"numeric"}).toString());
            contenido = contenido.replace("@logo",d_provider.logo.toString('base64'));
            contenido = contenido.replace("@firma",d_provider.firma.toString('base64'));
            contenido = contenido.replace("@profesiones",d_provider.profesiones);

        }
        if(r == "PROCEDIMIENTOS"){
            let response = await fn_procedimientos(pac,enc,uuid,provider_id)
            let proced = response.reporteProcedimientos[0][0];
            contenido = 
            plantillaPrincipal(
                'Ordenes',
                procedimientos(proced.Descripcion_orden,proced.Instrucciones)
            )
            let paciente = response.datosPaciente[0][0];            
            contenido = contenido.replace("@fecha",new Date().toLocaleDateString("en-US").toString());
            contenido = contenido.replace("@nombreCompleto",paciente.nombreCompleto);
            contenido = contenido.replace("@tipo_identificacion",paciente.tipo_identificacion);
            contenido = contenido.replace("@identificacion",paciente.identificacion);
            contenido = contenido.replace("@genero",paciente.genero);
            contenido = contenido.replace("@edad",paciente.edad);
            contenido = contenido.replace("@EstadoCivil",paciente.EstadoCivil);
            contenido = contenido.replace("@Telefono",paciente.Telefono);
            contenido = contenido.replace("@Telefono2",paciente.Telefono2);
            contenido = contenido.replace("@Direccion",paciente.Direccion);
            contenido = contenido.replace("@TipoAfiliacion",paciente.TipoAfiliacion);
            contenido = contenido.replace("@eps",paciente.eps);
            contenido = contenido.replace("@diagnostico",paciente.diagnostico);
            contenido = contenido.replace("@cup",paciente.cup);
            
            let d_provider = response.datosProvider[0][0];
            contenido = contenido.replace("@nombres",d_provider.nombres);
            contenido = contenido.replace("@identifier",d_provider.identifier);
            contenido = contenido.replace("@fecha_encuentro",new Date(d_provider.fecha_encuentro).toLocaleDateString("en-US",{hour:"numeric",minute:"numeric"}).toString());
            contenido = contenido.replace("@logo",d_provider.logo.toString('base64'));
            contenido = contenido.replace("@firma",d_provider.firma.toString('base64'));
            contenido = contenido.replace("@profesiones",d_provider.profesiones);

        }
        if(r == "RECOMENDACIONES"){
            let response = await fn_recomendaciones(pac,enc,uuid,provider_id)
            let recom = response.reporteRecomendaciones[0][0];
            contenido = 
            plantillaPrincipal(
                'Orden de Recomendaciones',
                recomendaciones(recom.Descripcion_orden,recom.Instrucciones)
            );
            let paciente = response.datosPaciente[0][0];            
            contenido = contenido.replace("@fecha",new Date().toLocaleDateString("en-US").toString());
            contenido = contenido.replace("@nombreCompleto",paciente.nombreCompleto);
            contenido = contenido.replace("@tipo_identificacion",paciente.tipo_identificacion);
            contenido = contenido.replace("@identificacion",paciente.identificacion);
            contenido = contenido.replace("@genero",paciente.genero);
            contenido = contenido.replace("@edad",paciente.edad);
            contenido = contenido.replace("@EstadoCivil",paciente.EstadoCivil);
            contenido = contenido.replace("@Telefono",paciente.Telefono);
            contenido = contenido.replace("@Telefono2",paciente.Telefono2);
            contenido = contenido.replace("@Direccion",paciente.Direccion);
            contenido = contenido.replace("@TipoAfiliacion",paciente.TipoAfiliacion);
            contenido = contenido.replace("@eps",paciente.eps);
            contenido = contenido.replace("@diagnostico",paciente.diagnostico);
            contenido = contenido.replace("@cup",paciente.cup);
            
            let d_provider = response.datosProvider[0][0];
            contenido = contenido.replace("@nombres",d_provider.nombres);
            contenido = contenido.replace("@identifier",d_provider.identifier);
            contenido = contenido.replace("@fecha_encuentro",new Date(d_provider.fecha_encuentro).toLocaleDateString("en-US",{hour:"numeric",minute:"numeric"}).toString());
            contenido = contenido.replace("@logo",d_provider.logo.toString('base64'));
            contenido = contenido.replace("@firma",d_provider.firma.toString('base64'));
            contenido = contenido.replace("@profesiones",d_provider.profesiones);
            
        }
        if(r == "HISTORIA"){
            contenido = historia
        }
        
        pdf.create(contenido).toFile(`./files/netmedik${enc}.pdf`, function(err, resp) {
            if (err){
                console.log(err);
               
            } else {
                res.status(200).json({resp});
                
            }
        });
       
    } catch (error) {
        console.log(error)
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
    let reporteIncapacidad = await ImpresionResolver.sp_reporte_incapacidad(pac,enc,uuid);
    if(uuid != null){
        reporteIncapacidad = await ImpresionResolver.sp_reporte_incapacidad(pac,null,uuid);
    }
    const patient_id = await ImpresionResolver.getEncounter(enc);
    const datosPaciente = await ImpresionResolver.sp_reporte_datos_paciente(enc,patient_id[0][0]["patient_id"]);
    const firma2 = await ImpresionResolver.Usp_Carga_2da_Firma(enc);
    return {datosProvider,reporteIncapacidad,patient_id,datosPaciente,firma2}
}

const fn_procedimientos = async (pac, enc, uuid, provider_id) => {
    const datosProvider = await ImpresionResolver.sp_reporte_datos_provider(provider_id,enc);
    let reporteProcedimientos = await ImpresionResolver.sp_reporte_procedimientos(pac,enc,uuid);
    if(uuid != null){
        reporteProcedimientos = await ImpresionResolver.sp_reporte_procedimientos(pac,null,uuid);
    }
    const patient_id = await ImpresionResolver.getEncounter(enc);
    const datosPaciente = await ImpresionResolver.sp_reporte_datos_paciente(enc,patient_id[0][0]["patient_id"]);
    const firma2 = await ImpresionResolver.Usp_Carga_2da_Firma(enc);
    return {datosProvider,reporteProcedimientos,patient_id,datosPaciente,firma2}
}

const fn_recomendaciones = async (pac, enc, uuid, provider_id) => {
    const datosProvider = await ImpresionResolver.sp_reporte_datos_provider(provider_id,enc);
    let reporteRecomendaciones = await ImpresionResolver.sp_reporte_otros(pac,enc,uuid);
    if(uuid != null){
        reporteRecomendaciones = await ImpresionResolver.sp_reporte_otros(pac,null,uuid);
    }
    const patient_id = await ImpresionResolver.getEncounter(enc);
    const datosPaciente = await ImpresionResolver.sp_reporte_datos_paciente(enc,patient_id[0][0]["patient_id"]);
    const firma2 = await ImpresionResolver.Usp_Carga_2da_Firma(enc);
    return {datosProvider,reporteRecomendaciones,patient_id,datosPaciente,firma2}
}

module.exports = {
    impirmir
}