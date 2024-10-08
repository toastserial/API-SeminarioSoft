const ModeloCargo = require('../modelos/clientes/clientetelefono');
const { enviar, errores } = require('../configuracion/ayuda');
const { validationResult } = require('express-validator');
const { where } = require('sequelize');
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
    //const { nombre } = req.body
    //console.log(nombre);
    var contenido = {
        tipo: 0,
        datos: [],
        msj: [],
    }
    contenido.msj = errores(validationResult(req));
    if(contenido.msj.length>0){
        enviar(200, contenido, res);
    }
    else{
        try {
            await ModeloCargo.create({...req.body}) //Para jalar datos especificos se utiliza por ejemplo "nombre :nombre", siempre y cuando lleven el mismo nombre puede ser solamente "nombre".
            .then((data)=>{
                contenido.tipo=1;
                contenido.datos=data;
                enviar(200, contenido, res);
            })
            .catch((er)=>{
                console.log(er);
                contenido.tipo=1;
                contenido.datos="Error en la consulta";
                enviar(200, contenido, res);
            })
        } catch (error) {
            console.log(error);
            contenido.tipo=0;
            contenido.msj="Error en el servidor";
            enviar(500, contenido, res);
        }
    }
};

exports.editar = async (req, res) => {
    const {id} = req.query;
    //console.log(nombre);
    var contenido = {
        tipo: 0,
        datos: [],
        msj: [],
    }
    contenido.msj = errores(validationResult(req));
    if(contenido.msj.length>0){
        enviar(200, contenido, res);
    }
    else{
        try {
            await ModeloCargo.update(
                {...req.body}, //Para jalar datos especificos se utiliza por ejemplo "nombre :nombre", siempre y cuando lleven el mismo nombre puede ser solamente "nombre".
                {where: {id: id}})
            .then((data)=>{
                contenido.tipo=1;
                contenido.datos=data;
                enviar(200, contenido, res);
            })
            .catch((er)=>{
                console.log(er);
                contenido.tipo=1;
                contenido.datos="Error en la consulta";
                enviar(200, contenido, res);
            })
        } catch (error) {
            console.log(error);
            contenido.tipo=0;
            contenido.msj="Error en el servidor";
            enviar(500, contenido, res);
        }
    }
};

exports.eliminar = async (req, res) => {
    const {id} = req.query;
    //console.log(nombre);
    var contenido = {
        tipo: 0,
        datos: [],
        msj: [],
    }
    contenido.msj = errores(validationResult(req));
    if(contenido.msj.length>0){
        enviar(200, contenido, res);
    }
    else{
        try {
            await ModeloCargo.destroy({where:{id:id}})
            .then((data)=>{
                contenido.tipo=1;
                contenido.datos=data;
                contenido.msj = "Eliminado correctamente";
                enviar(200, contenido, res);
            })
            .catch((er)=>{
                console.log(er);
                contenido.tipo=0;
                contenido.datos="Error en la consulta";
                enviar(200, contenido, res);
            })
        } catch (error) {
            console.log(error);
            contenido.tipo=0;
            contenido.msj="Error en el servidor";
            enviar(500, contenido, res);
        }
    }
};