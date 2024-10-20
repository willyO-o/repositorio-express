// const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const { dbPrefix } = require('../utils/helpers');


const Persona = sequelize.define('Persona', {

}, {
    tableName: dbPrefix('persona'),
    schema: 'principal',
    timestamps: false,
    sequelize,
});


Persona.listarPersonas = async function(search) {

    const sql = `SELECT 
                id_persona,
                nombre,
                paterno,
                materno,
                ci,
                celular
                FROM principal.${dbPrefix('persona')} 
                WHERE (UNACCENT(nombre || ' ' || paterno || ' ' || materno) ILIKE UNACCENT('%${search}%')
                OR UNACCENT(paterno || ' ' || materno || ' ' || nombre) ILIKE UNACCENT('%${search}%')
                OR UNACCENT(nombre || ' ' || materno || ' ' || paterno) ILIKE UNACCENT('%${search}%')
                OR UNACCENT(nombre) ILIKE UNACCENT('%${search}%')
                OR UNACCENT(paterno) ILIKE UNACCENT('%${search}%')
                OR UNACCENT(materno) ILIKE UNACCENT('%${search}%')
                OR celular ILIKE '%${search}%'
                OR ci ILIKE '%${search}%' )
                LIMIT 15
    `;
    const autores = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT,
        logging: console.log
    });

    return autores;

}


module.exports = Persona;