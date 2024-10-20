dotenv = require('dotenv');
dotenv.config();

function dbPrefix(table) {
    return process.env.DB_PREFIX + table;
}

function mainSchema() {
    return process.env.DB_MAIN_SCHEMA;
}

// text 
function searchConvert(search) {

    //verificar si es null
    if (search == null) {
        return '';
    }

    return search.replace(/ /g, '%').trim();
}

module.exports = {
    dbPrefix,
    mainSchema,
    searchConvert
}