const {sequelize} = require('../models');

module.exports = {

    listCita:() => sequelize.query(
        `select * from cita c 
        inner join contract ct on c.id_provider = ct.provider_id
        and c.id_tipousuario = ct.managing_entity_id
        and c.id_tipoafiliado <> ct.health_plan_id
        where c.fecreacion > '2021-08-01'`
    ),

    updateCita:(id_cita,id_tipoafiliado) => sequelize.query(
        `update cita set id_tipoafiliado = ${id_tipoafiliado} where id_cita=${id_cita}`
    )
  
}