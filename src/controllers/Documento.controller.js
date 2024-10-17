// const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
// const Sequelize = require('sequelize');
const Documento = require('../models/Documento.model');



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


module.exports = {
    listarDocumentos
}