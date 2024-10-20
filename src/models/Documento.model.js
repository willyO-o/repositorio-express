const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const { dbPrefix, mainSchema } = require('../utils/helpers');


const Documento = sequelize.define('Documento', {
    id_documento: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    fecha_publicacion: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    id_gestion: {
        type: DataTypes.INTEGER(4),
        allowNull: false
    },
    resumen: {
        type: DataTypes.STRING(-1),
        allowNull: true
    },
    lenguaje: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    titulo: {
        type: DataTypes.STRING(2000),
        allowNull: true
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_sede: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_usuario_publicador: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    nro_paginas: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    observaciones: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    estado_documento: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    tamanio_archivo: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    url_archivo: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    uuid: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    codigo_documento: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    es_publico: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    nro_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_usuario_registro: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    derechos: {
        type: DataTypes.STRING(-1),
        allowNull: true
    },
    fecha_modificacion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull: true
    },
    fecha_entrega: {
        type: DataTypes.DATE,
        allowNull: true
    },
    id_planificacion_programa: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    url_portada: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    otro_titulo: {
        type: DataTypes.STRING(-1),
        allowNull: true
    },
    id_coordinador: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

}, {
    tableName: dbPrefix('srp_documento'),
    schema: 'repositorio',
    timestamps: false,
    sequelize,
});

//crear funcion personalizada para consulta sql
Documento.listarDocumentos = async function() {
    // "jsonb_agg(to_jsonb(a))"
    const query =
        `SELECT 
            d.* ,
            c.categoria,
            g.gestion,
            TO_CHAR(d.fecha_entrega, 'DD/MM/YYYY') as fecha_entrega,
            pp.nombre_programa,
            CONCAT(coor.nombre, ' ', coor.paterno, ' ', coor.materno) as coordinador,
            jsonb_agg(
                jsonb_build_object(
                    'id_persona', a.id_persona,
                    'nombre', a.nombre,
                    'paterno', a.paterno,
                    'materno', a.materno,
                    'ci', a.ci
                )
            ) as autor,
            jsonb_agg(
                jsonb_build_object(
                    'id_persona', t.id_persona,
                    'nombre', t.nombre,
                    'paterno', t.paterno,
                    'materno', t.materno,
                    'ci', t.ci
                )
            ) as tutor

        FROM ${mainSchema()}.${dbPrefix('srp_documento')} d
        JOIN academico.${dbPrefix('gestion')} g ON d.id_gestion = g.id_gestion
        LEFT JOIN ${mainSchema()}.${dbPrefix('srp_categoria')} c ON d.id_categoria = c.id_categoria
        LEFT JOIN ${mainSchema()}.${dbPrefix('srp_autor_documento')} ad ON d.id_documento = ad.id_documento
        LEFT JOIN principal.${dbPrefix('persona')} a ON ad.id_persona = a.id_persona
        LEFT JOIN ${mainSchema()}.${dbPrefix('srp_tutor_documento')} td ON d.id_documento = td.id_documento
        LEFT JOIN principal.${dbPrefix('persona')} t ON td.id_persona = a.id_persona
        LEFT JOIN public.${dbPrefix('vista_programas')} pp ON d.id_planificacion_programa = pp.id_planificacion_programa
        LEFT JOIN principal.${dbPrefix('persona')} coor ON d.id_coordinador = coor.id_persona
        GROUP BY d.id_documento, pp.nombre_programa, coor.id_persona,g.id_gestion, c.id_categoria
        `;

    const [totalRecords] = await sequelize.query(`SELECT COUNT(*) as count FROM ${mainSchema()}.${dbPrefix('srp_documento')}`, {
        type: sequelize.QueryTypes.SELECT,
    });

    const [recordsFiltered] = await sequelize.query(`SELECT COUNT(*) FROM (${query}) as count`, {
        type: sequelize.QueryTypes.SELECT,
    });

    const documentos = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
        // logging: console.log
    });

    return {
        recordsTotal: totalRecords.count,
        documentos: documentos,
        recordsFiltered: recordsFiltered.count
    };

}

module.exports = Documento;