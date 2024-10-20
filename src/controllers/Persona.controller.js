const asyncHandler = require('../utils/asyncHandler');
const Persona = require('../models/Persona.model');
const { searchConvert } = require('../utils/helpers');

const listarPersonas = asyncHandler(async(req, res) => {
    const search = searchConvert(req.query.search);
    const result = await Persona.listarPersonas(search);
    return res.json(result);
});

module.exports = {
    listarPersonas
}