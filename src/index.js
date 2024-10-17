const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/database');

const routes = require('./routes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/', routes);


sequelize.sync().then(() => {
    console.log('Conexión establecida con la base de datos');
}).catch(error => {
    console.log('Error al conectar con la base de datos:', error);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server is running on port ${process.env.PORT}`);
});