// const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const Documento = require('../models/Documento.model');
const { validationResult } = require('express-validator');



const listarDocumentos = asyncHandler(async(req, res) => {
    const result = await Documento.listarDocumentos();
    // console.log(req.query);
    // console.log(result);
    // res.json(documentos);
    return res.json({
        draw: req.query.draw,
        recordsTotal: result.recordsTotal,
        recordsFiltered: result.recordsFiltered,
        data: result.documentos, // Aquí devuelves los documentos de la página actual
    });

    // res.json({
    //     data: documentos
    // });
});

const registrarDocumento = asyncHandler(async(req, res) => {
    const documento = req.body;
    const archivo = req.files;

    console.log(documento);
    //setear la  regla de validacion

    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    //crear el documento
    documento.uuid = "12312333";

    const result = await Documento.create(documento, {
        logging: console.log,
    }).catch((error) => {
        console.log(error);
    });
    console.log(result);

    const autores = JSON.parse(documento.autor);
    const tutores = JSON.parse(documento.tutor);
    // console.log(autores);
    return res.json(documento);
});

module.exports = {
    listarDocumentos,
    registrarDocumento,
}