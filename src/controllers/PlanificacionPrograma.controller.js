const asyncHandler = require('../utils/asyncHandler');
const { searchConvert } = require('../utils/helpers');
const PlanificacionPrograma = require('../models/PlanificacionPrograma.model');

const listarPlanificacionPrograma = asyncHandler(async(req, res) => {
    const search = searchConvert(req.query.search);
    const result = await PlanificacionPrograma.listarPlanificacionPrograma(search);
    return res.json(result);
});

module.exports = {
    listarPlanificacionPrograma
}