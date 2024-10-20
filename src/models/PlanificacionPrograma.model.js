const sequelize = require('../config/database.js');
const { dbPrefix } = require('../utils/helpers');


const PlanificacionPrograma = sequelize.define('PlanificacionPrograma', {

}, {
    tableName: dbPrefix('planificacion_programa'),
    schema: 'academico',
    timestamps: false,
    sequelize,
});


PlanificacionPrograma.listarPlanificacionPrograma = async function(search) {
    const sql = `SELECT 
                id_planificacion_programa,
                denominacion_programa,
                nombre_programa,
                gestion_programa,
                descripcion_grado_academico
                FROM public.${dbPrefix('vista_programas')} 
                WHERE UNACCENT(nombre_programa) ILIKE UNACCENT('%${search}%')
                OR UNACCENT(denominacion_programa) ILIKE UNACCENT('%${search}%')
                OR (gestion_programa::TEXT) ILIKE UNACCENT('%${search}%')
                LIMIT 15`;
    const programas = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
        logging: console.log
    });

    return programas;
}





module.exports = PlanificacionPrograma;