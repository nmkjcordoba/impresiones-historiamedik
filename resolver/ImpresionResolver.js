const {sequelize} = require('../models');

module.exports = {

    sp_reporte_datos_provider:(provider_id, encounter_id) => sequelize.query(
        'EXEC sp_reporte_datos_provider :provider_id,:encounter_id', 
        {replacements:{provider_id,encounter_id}}
    ),

    sp_reporte_prescripcion:(encounter_id,uuid,pac) => sequelize.query(
        'EXEC sp_reporte_prescripcion :encounter_id,:uuid,:pac', 
        {replacements:{encounter_id,uuid,pac}}
    ),

    getEncounter:(encounter_id) => sequelize.query(
        `select * from encounter where encounter_id = ${encounter_id}`
    ),

    sp_reporte_datos_paciente:(encounter_id,patient_id) => sequelize.query(
        'EXEC sp_reporte_datos_paciente :encounter_id,:patient_id', 
        {replacements:{encounter_id,patient_id}}
    ),

    Usp_Carga_2da_Firma:(encounter_id) => sequelize.query(
        'EXEC Usp_Carga_2da_Firma :encounter_id', 
        {replacements:{encounter_id}}
    ),

    sp_reporte_incapacidad:(pac,encounter_id,uuid) => sequelize.query(
        'EXEC sp_reporte_incapacidad :pac,:encounter_id,:uuid', 
        {replacements:{pac,encounter_id,uuid}}
    ),

    sp_reporte_procedimientos:(pac,encounter_id,uuid) => sequelize.query(
        'EXEC sp_reporte_procedimientos :pac,:encounter_id,:uuid', 
        {replacements:{pac,encounter_id,uuid}}
    ),

    sp_reporte_otros:(pac,encounter_id,uuid) => sequelize.query(
        'EXEC sp_reporte_otros :pac,:encounter_id,:uuid', 
        {replacements:{pac,encounter_id,uuid}}
    ),
  
}