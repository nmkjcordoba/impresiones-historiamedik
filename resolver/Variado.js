const {sequelize} = require('../models');

module.exports = {

    listCita:() => sequelize.query(
        `select * from cita c 
        inner join contract ct on c.id_provider = ct.provider_id
        and c.id_tipousuario = ct.managing_entity_id
        and c.id_tipoafiliado <> ct.health_plan_id
        inner join category ca on ca.category_id = c.aseguradora
        where c.fecreacion > '2021-12-01' 
        and c.id_tipousuario <> 0
        and c.aseguradora <> 0 
        order by c.id_cita`
    ),

    updateCita:(id_cita,id_tipoafiliado) => sequelize.query(
        `update cita set id_tipoafiliado = ${id_tipoafiliado} where id_cita=${id_cita}`
    ),

    insertAnexo:(pac,user_id,file,nombrearchivo,palabracortada,nombre_estudio,tipo_estudio,detalle,type) => sequelize.query(
        `EXEC sp_insert_documents2 "${pac}",0,${user_id},null,"${type}",${file},"${nombrearchivo}","${palabracortada}","${nombre_estudio}","${tipo_estudio}","${detalle}"`
    )
  
}