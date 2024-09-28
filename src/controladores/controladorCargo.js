const ModeloCargo = require('../modelos/cargo');
const {enviar, errores} = require('../configuracion/ayuda');
const {validationResult} = require('express-validator');

exports.inicio = (req, res) => {
    console.log(req)
    res.json({msj: "Hola Mundo"});
};

exports.listar = async (req, res) => {
    var contenido = {
        tipo: 0,
        datos: [],
        msj: [],
    }
    try {
        await ModeloCargo.findAll()
        .then(((data) => {
            contenido.tipo=1;
            contenido.datos=data;
            enviar(200, contenido, res);
        }))
        .catch((er) => {
            contenido.tipo=0;
            contenido.msj="Error al cargar los datos del cargo";
            enviar(200, contenido, res);
        });
    } catch (error) {
        contenido.tipo=0;
        contenido.msj="Error en el servidor";
        enviar(500, contenido, res);
    }
};

exports.guardar = async (req, res) => {
    const {nombre} = req.body;
    var contenido = {
        tipo: 0,
        datos: [],
        msj: [],
    }
    contenido.msj = errores(validationResult(req));
    console.log(contenido.msj);
    //contenido.msj = errores(validationResult(req));
    try {
        contenido.tipo=1;
        contenido.datos="Hola Mundo";
        enviar(200, contenido, res);

    } catch (error) {
        contenido.tipo=0;
        contenido.msj="Error en el servidor";
        enviar(500, contenido, res);
    }
};
