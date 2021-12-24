const ImpresionResolver = require('../resolver/ImpresionResolver');
var fs = require('fs');
var { constancia, preescripcion, procedimientos, recomendaciones, incapacidad, historia, plantillaPrincipal} = require('../plantillas');
const impirmir = async (req, res) => {
    var pdf = require('html-pdf');

    
    const r = req.params.r;
    const enc = req.params.encounter;
    const uuid = req.params.uuid == 0 ? null : req.params.uuid;
    const pac = req.params.pac == 0? '':req.params.pac;
    const cita = req.params.cita;
    const provider_id = req.params.provider_id;
    var contenido = plantillaPrincipal("Sin datos","<span>No hay datos</span>");
    
    try {
        if(r == "CONSTANCIA"){
            contenido = constancia();
            let response = await fn_constancia(cita);
            let _constancia = response.constancia[0][0]
            
            contenido = contenido.replace("@prov_Logo",_constancia.prov_Logo.toString('base64'));
            contenido = contenido.replace("@prov_Name",_constancia.prov_Name);
            contenido = contenido.replace("@pt_TipoId",_constancia.pt_TipoId);
            contenido = contenido.replace("@pt_Identificacion",_constancia.pt_Identificacion);
            contenido = contenido.replace("@pat_Name",_constancia.pat_Name);
            contenido = contenido.replace("@pat_Phone",_constancia.pat_Phone);
            contenido = contenido.replace("@pat_Address",_constancia.pat_Address);
            contenido = contenido.replace("@pat_Eps",_constancia.pat_Eps);
            contenido = contenido.replace("@cita_Date",_constancia.cita_Date.trim());
            contenido = contenido.replace("@cita_Hora",_constancia.cita_Hora);
            contenido = contenido.replace("@cita_Tipo",_constancia.cita_Tipo);
            contenido = contenido.replace("@fecha_actual",new Date().toLocaleDateString("en-US").toString());
            
        }
        if(r == "PRESCRIPCION"){
            let response = await fn_preescripcion(pac,enc,uuid,provider_id);
            let presc = response.reportePreescripcion[0];
            contenido =  
            plantillaPrincipal(
                'PRESCRIPCION',
                presc.length > 1 && uuid == null?
                presc.map(e => (
                    preescripcion(e.drug_name,e.dosage,e.quantity,e.dose,e.units,e.route,e.frequency,e.duration,e.observation)
                )).join("")  
                :
                preescripcion(presc[0].drug_name,presc[0].dosage,presc[0].quantity,presc[0].dose,presc[0].units,presc[0].route,presc[0].frequency,presc[0].duration,presc[0].observation)
                
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
            contenido = contenido.replace("@cup",paciente.cup == undefined ? "":paciente.cup);
            
            let d_provider = response.datosProvider[0][0];
            contenido = contenido.replace("@nombres",d_provider.nombres);
            contenido = contenido.replace("@identifier",d_provider.identifier);
            contenido = contenido.replace("@fecha_encuentro",new Date(d_provider.fecha_encuentro).toLocaleDateString("en-US",{hour:"numeric",minute:"numeric"}).toString());
            contenido = contenido.replace("@logo",d_provider.logo == undefined ? "" : d_provider.logo.toString('base64'));
            contenido = contenido.replace("@firma",d_provider.firma == undefined ? "" : d_provider.firma.toString('base64'));
            contenido = contenido.replace("@profesiones",d_provider.profesiones);

        }
        if(r == "INCAPACIDAD"){
            let response = await fn_incapacidad(pac,enc,uuid,provider_id)
            let incap = response.reporteIncapacidad[0];
            contenido = 
            plantillaPrincipal(
                'Orden Incapacidad',
                incap > 1 && uuid == null?
                incap.map(e => (
                    incapacidad(e.description,e.start_date,e.auto_expire_date,e.Dias,e.instructions)    
                )).join("")
                :
                incapacidad(incap[0].description,incap[0].start_date,incap[0].auto_expire_date,incap[0].Dias,incap[0].instructions)
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
            contenido = contenido.replace("@cup",paciente.cup == undefined ? "":paciente.cup);
            
            let d_provider = response.datosProvider[0][0];
            contenido = contenido.replace("@nombres",d_provider.nombres);
            contenido = contenido.replace("@identifier",d_provider.identifier);
            contenido = contenido.replace("@fecha_encuentro",new Date(d_provider.fecha_encuentro).toLocaleDateString("en-US",{hour:"numeric",minute:"numeric"}).toString());
            contenido = contenido.replace("@logo",d_provider.logo == undefined ? "" : d_provider.logo.toString('base64'));
            contenido = contenido.replace("@firma",d_provider.firma == undefined ? "" : d_provider.firma.toString('base64'));
            contenido = contenido.replace("@profesiones",d_provider.profesiones);

        }
        if(r == "PROCEDIMIENTOS"){
            let response = await fn_procedimientos(pac,enc,uuid,provider_id)
            let proced = response.reporteProcedimientos[0];
            console.log("haj")
            var htmlOrden = [];
            for (let index = 0; index < proced.length; index++) {
                const e = proced[index];
                htmlOrden.push(procedimientos(e.Descripcion_orden,e.Instrucciones,index,[]).replace("<li>","").replace("</li>","").replace("<span>","").replace("</span>","").replace(/\s+/g, " "))
                
            }
            //console.log(htmlOrden)
            //console.log(paginaDividida(htmlOrden));
            contenido = 
            plantillaPrincipal(
                'Ordenes',
                proced.length > 1 && uuid == null?
                proced.map((e,index) =>(
                    procedimientos(e.Descripcion_orden,e.Instrucciones,index,paginaDividida(htmlOrden))
                )).join("")
                :
                procedimientos(proced[0].Descripcion_orden,proced[0].Instrucciones)
            )
            
            let paciente = response.datosPaciente[0][0];            
            contenido = contenido.replace(/@fecha/g,new Date().toLocaleDateString("en-US").toString());
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
            contenido = contenido.replace("@cup",paciente.cup == undefined ? "":paciente.cup);
            
            let d_provider = response.datosProvider[0][0];
            contenido = contenido.replace("@nombres",d_provider.nombres);
            contenido = contenido.replace("@identifier",d_provider.identifier);
            contenido = contenido.replace(/@fecha_encuentro/g,new Date(d_provider.fecha_encuentro).toLocaleDateString("en-US",{hour:"numeric",minute:"numeric"}).toString());
            contenido = contenido.replace("@logo",d_provider.logo == undefined ? "" : d_provider.logo.toString('base64'));
            contenido = contenido.replace("@firma",d_provider.firma == undefined ? "" : d_provider.firma.toString('base64'));
            contenido = contenido.replace("@profesiones",d_provider.profesiones);

        }
        if(r == "RECOMENDACIONES"){
            let response = await fn_recomendaciones(pac,enc,uuid,provider_id)
            let recom = response.reporteRecomendaciones[0];
            contenido = 
            plantillaPrincipal(
                'Orden de Recomendaciones',
                recom.length > 1 && uuid == null?
                recom.map(e => (
                    recomendaciones(e.Descripcion_orden,e.Instrucciones)    
                )).join("")
                :
                recomendaciones(recom[0].Descripcion_orden,recom[0].Instrucciones)
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
            contenido = contenido.replace("@cup",paciente.cup == undefined ? "":paciente.cup);
            
            let d_provider = response.datosProvider[0][0];
            contenido = contenido.replace("@nombres",d_provider.nombres);
            contenido = contenido.replace("@identifier",d_provider.identifier);
            contenido = contenido.replace("@fecha_encuentro",new Date(d_provider.fecha_encuentro).toLocaleDateString("en-US",{hour:"numeric",minute:"numeric"}).toString());
            contenido = contenido.replace("@logo",d_provider.logo == undefined ? "" : d_provider.logo.toString('base64'));
            contenido = contenido.replace("@firma",d_provider.firma == undefined ? "" : d_provider.firma.toString('base64'));
            contenido = contenido.replace("@profesiones",d_provider.profesiones);
            
        }
        if(r == "HISTORIA"){
            contenido = historia
        }
        fs.writeFile("./files/htmlarchivo.html", contenido, (err) => {
            if (err) throw err;
        
            console.log("The file was succesfully saved!");
        });
        const config = {"footer":{"height": "60mm"}}
        pdf.create(contenido,config).toFile(`./files/netmedik${enc == 0 ? cita : enc}.pdf`, function(err, resp) {
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
    /*if(uuid != null){
        reportePreescripcion = await ImpresionResolver.sp_reporte_prescripcion(null,uuid,pac);
    }*/
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

const fn_constancia = async (cita) => {
    const constancia = await ImpresionResolver.sp_reporte_constanciaservicio(cita);
    return {constancia}
}

const paginaDividida = (html) => {
    var renglones = 0
    var dividirPagina = []
    for (let index = 0; index < html.length; index++) {
        const ele = html[index];
        renglones += Math.ceil((ele.length / 65));
        if(renglones > 26){
            renglones = 1;
            dividirPagina.push(index-1)
        }

    }
    return dividirPagina;
}

module.exports = {
    impirmir
}