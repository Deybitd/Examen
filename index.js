const express = require('express');
const debug = require('debug')('app:main');
const {Config} = require('./source/config/index')

const {EmpleadosAPI} = require('./source/empleados/index');

const app = express();
app.use(express.json());
EmpleadosAPI(app);

app.listen(Config.port,()=>{
    debug(`Servidor escuchando en el puerto ${Config.port}`);
});