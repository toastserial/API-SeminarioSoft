const express = require('express');
const morgan = require('morgan');
const db = require('./configuracion/db');
const modeloCargo = require('./modelos/cargo');
const modeloEmpleado = require('./modelos/empleado');
const modeloDepartamento = require('./modelos/ubicacion/departamento');
const modeloMunicipio = require('./modelos/ubicacion/municipio');
const modeloCiudad = require('./modelos/ubicacion/ciudad');
const modeloBarrio = require('./modelos/ubicacion/barrio');
const modeloCliente = require('./modelos/clientes/cliente');
const modeloClienteDireccion = require('./modelos/clientes/clientedireccion');
const modeloClienteTelefono = require('./modelos/clientes/clientetelefono');

db.authenticate()
.then( async (data)=>{
    console.log("Conexion establecida");
    modeloCargo.hasMany(modeloEmpleado);
    modeloEmpleado.belongsTo(modeloCargo);

    //ubicacion
    modeloDepartamento.hasMany(modeloMunicipio);
    modeloMunicipio.belongsTo(modeloDepartamento);
    modeloMunicipio.hasMany(modeloCiudad);
    modeloCiudad.belongsTo(modeloMunicipio);
    modeloCiudad.hasMany(modeloBarrio);
    modeloBarrio.belongsTo(modeloCiudad);

    //clientes
    modeloCliente.hasMany(modeloClienteDireccion);
    modeloClienteDireccion.belongsTo(modeloCliente);
    modeloCliente.hasMany(modeloClienteTelefono);
    modeloClienteTelefono.belongsTo(modeloCliente);

    await modeloCargo.sync().then((da)=>{
        console.log("Modelo Cargo creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo cargo "+ e);
    });
    await modeloEmpleado.sync().then((da)=>{
        console.log("Modelo Empleado creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo cargo "+ e);
    });
    await modeloDepartamento.sync().then((da)=>{
        console.log("Modelo Depatrtamento creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo departamento "+ e);
    });
    await modeloMunicipio.sync().then((da)=>{
        console.log("Modelo Municipio creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo municipio "+ e);
    });
    await modeloCiudad.sync().then((da)=>{
        console.log("Modelo Ciudad creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo ciudad "+ e);
    });
    await modeloBarrio.sync().then((da)=>{
        console.log("Modelo Barrio creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo barrio "+ e);
    });
    await modeloCliente.sync().then((da)=>{
        console.log("Modelo Cliente creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo cliente "+ e);
    });
    await modeloClienteDireccion.sync().then((da)=>{
        console.log("Modelo ClienteDireccion creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo ClienteDireccion "+ e);
    });
    await modeloClienteTelefono.sync().then((da)=>{
        console.log("Modelo ClienteTelefono creado correctamente")
    })
    .catch((e)=>{
        console.log("Error al crear el modelo ClienteTelefono "+ e);
    });
})
.catch((er)=>{
    console.log("Error: " + er);
});
const app = express();
app.set('port', 3001);
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api', require('./rutas'));
app.use('/api/cargos', require('./rutas/rutaCargo'));
app.use('/api/departamentos', require('./rutas/rutaDept'));
app.use('/api/barrios', require('./rutas/rutaBarrio'));
app.use('/api/ciudades', require('./rutas/rutaCiudad'));
app.use('/api/municipios', require('./rutas/rutaMunicipio'));
app.use('/api/clientes', require('./rutas/rutaCliente'));
app.use('/api/empleados', require('./rutas/rutaEmpleado'));
app.use('/api/telefonos', require('./rutas/rutaClienteTelefono'));
app.use('/api/direccion', require('./rutas/rutaClienteDireccion'));
app.listen(app.get('port'), ()=>{
    console.log('Servidor iniciado en el puerto ' + app.get('port'));
});