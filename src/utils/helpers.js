dotenv = require('dotenv');
dotenv.config();

function dbPrefix(table) {
    return process.env.DB_PREFIX + table;
}

function mainSchema() {
    return process.env.DB_MAIN_SCHEMA;
}
module.exports = {
    dbPrefix,
    mainSchema
}