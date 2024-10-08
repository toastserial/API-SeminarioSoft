const { Router } = require('express');
const controladorCliente = require('../controladores/controladorCliente');
const ModeloCliente = require('../modelos/clientes/cliente');
const { body, query } = require('express-validator');
const rutas = Router();
rutas.get('/', controladorCliente.inicio);
rutas.get('/listar', controladorCliente.listar);
rutas.post('/guardar',
    body("identidad").isInt(min = 13).withMessage("La identidad debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarCliente = await ModeloCliente.findOne({
                    where: {
                        identidad: value
                    }
                });
                if (BuscarCliente) {
                    throw new Error('La identidad no existe');
                }
            }
        }),
    body("rtn").isInt(min = 13).withMessage("El rtn debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarCliente = await ModeloCliente.findOne({
                    where: {
                        rtn: value
                    }
                });
                if (BuscarCliente) {
                    throw new Error('El rtn no existe');
                }
            }
        }),
    body("primernombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener 3-50 caracteres')
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarCliente = await ModeloCliente.findOne({
                    where: {
                        primernombre: value
                    }
                });
                if (BuscarCliente) {
                    throw new Error('El nombre del primernombre ya existe');
                }
            }
        }),
    body("primerapellido").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener 3-50 caracteres')
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarCliente = await ModeloCliente.findOne({
                    where: {
                        primerapellido: value
                    }
                });
                if (BuscarCliente) {
                    throw new Error('El nombre del primerapellido ya existe');
                }
            }
        }),
    body("activo").optional().isBoolean().withMessage("Solo se permiten valores booleanos"),
    controladorCliente.guardar);
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarCliente = await ModeloCliente.findOne({
                    where: {
                        id: value
                    }
                });
                if (!BuscarCliente) {
                    throw new Error('El id del barrio no existe');
                }
            }
        }),
    body("identidad").isInt(min = 13).withMessage("La identidad debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarCliente = await ModeloCliente.findOne({
                    where: {
                        identidad: value
                    }
                });
                if (!BuscarCliente) {
                    throw new Error('La identidad no existe');
                }
            }
        }),
    body("rtn").isInt(min = 13).withMessage("El rtn debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarCliente = await ModeloCliente.findOne({
                    where: {
                        rtn: value
                    }
                });
                if (!BuscarCliente) {
                    throw new Error('El rtn no existe');
                }
            }
        }),
    body("primernombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener 3-50 caracteres')
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarCliente = await ModeloCliente.findOne({
                    where: {
                        primernombre: value
                    }
                });
                if (BuscarCliente) {
                    throw new Error('El nombre del primer nombre ya existe');
                }
            }
        }),
    body("primerapellido").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener 3-50 caracteres')
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarCliente = await ModeloCliente.findOne({
                    where: {
                        primerapellido: value
                    }
                });
                if (BuscarCliente) {
                    throw new Error('El nombre del primer apellido ya existe');
                }
            }
        }),
    body("activo").optional().isBoolean().withMessage("Solo se permiten valores booleanos"),
    controladorCliente.editar);
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarCliente = await ModeloCliente.findOne({
                    where: {
                        id: value
                    }
                });
                if (!BuscarCliente) {
                    throw new Error('El id del barrio no existe');
                }
            }
        }),
    controladorCliente.eliminar);
module.exports = rutas;