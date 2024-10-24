const { body } = require('express-validator');
const { fieldNotEmpty } = require('../../utils/customValidationRules');
const registrarDocumentoRules = [

    body('titulo').isString().isLength({ min: 1 }).notEmpty(),
    //permitir nulo
    body('resumen').isString().optional({ nullable: true }),
    body('id_categoria').isInt().notEmpty(),
    body('id_sede').isInt().notEmpty(),
    body('nro_paginas').isInt().isLength({ min: 0 }),
    body('observaciones').isString().optional({ nullable: true }),
    body('codigo_documento').isString().optional({ nullable: true }),
    body('es_publico').isBoolean().notEmpty(),
    body('nro_id').isInt().optional({ nullable: true }),
    body('derechos').isString().optional({ nullable: true }),
    body('fecha_entrega').isDate().optional({ nullable: true }),
    body('id_planificacion_programa').isInt().optional({ nullable: true }),
    body('otro_titulo').isString().optional({ nullable: true }),
    body('id_coordinador').isInt().optional({ nullable: true }),

    body('autor').custom(fieldNotEmpty),


];

module.exports = {
    registrarDocumentoRules,
}