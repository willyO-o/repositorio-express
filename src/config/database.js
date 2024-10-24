const { Sequelize } = require("sequelize");
dotenv = require('dotenv');
dotenv.config();


const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        logging: false,
    },
);




// Hook global para establecer el search_path antes de cada consulta squealize.query
// sequelize.addHook('beforeQuery', async(options) => {
//     await sequelize.query(`SET search_path TO ${process.env.DB_DEFAULT_SCHEMA};`);
//     console.log('search_path seteado');
// });

module.exports = sequelize;