const express = require('express');
const morgan = require('morgan');
const db = require('./configuracion/db');
const modeloCargo = require('./modelos/cargo');
const modeloEmpleado = require('./modelos/empleado');

db.authenticate()
.then( async(data) => {
    console.log("Conexión establecida correctamente");
    modeloCargo.hasMany(modeloEmpleado);
    modeloEmpleado.belongsTo(modeloCargo);
    await modeloCargo.sync().then((da)=>{
        console.log("Modelo Cargo creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo Cargo: " + e);
    });
    await modeloEmpleado.sync().then((da)=>{
        console.log("Modelo Empleado creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo Empleado: " + e);
    });
})
.catch((er) => {
    console.log("Error de conexión: " + er);
});

const app = express();
app.set('port', 3001);
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api',require('./rutas'));
app.listen(app.get('port'), () => {
    console.log('Servidor Iniciado en el puerto', + app.get('port'));
});