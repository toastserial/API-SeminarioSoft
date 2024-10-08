const { Router } = require('express');
const controladorEmpleado = require('../controladores/controladorEmpleado');
const ModeloEmpleado = require('../modelos/empleado');
const { body, query } = require('express-validator');
const rutas = Router();
rutas.get('/', controladorEmpleado.inicio);
rutas.get('/listar', controladorEmpleado.listar);
rutas.post('/guardar',
    body("identidad").isInt(min = 13).withMessage("La identidad debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarEmpleado = await ModeloEmpleado.findOne({
                    where: {
                        identidad: value
                    }
                });
                if (BuscarEmpleado) {
                    throw new Error('La identidad ya existe');
                }
            }
        }),
    body("rtn").isInt(min = 13).withMessage("El rtn debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarEmpleado = await ModeloEmpleado.findOne({
                    where: {
                        rtn: value
                    }
                });
                if (BuscarEmpleado) {
                    throw new Error('El rtn ya existe');
                }
            }
        }),
    body("primernombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener 3-50 caracteres')
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarEmpleado = await ModeloEmpleado.findOne({
                    where: {
                        primernombre: value
                    }
                });
                if (BuscarEmpleado) {
                    throw new Error('El nombre del primernombre ya existe');
                }
            }
        }),
    body("primerApellido").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener 3-50 caracteres')
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarEmpleado = await ModeloEmpleado.findOne({
                    where: {
                        primerapellido: value
                    }
                });
                if (BuscarEmpleado) {
                    throw new Error('El nombre del primerapellido ya existe');
                }
            }
        }),
    body("activo").optional().isBoolean().withMessage("Solo se permiten valores booleanos"),
    controladorEmpleado.guardar);
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarEmpleado = await ModeloEmpleado.findOne({
                    where: {
                        id: value
                    }
                });
                if (!BuscarEmpleado) {
                    throw new Error('El id del barrio ya existe');
                }
            }
        }),
    body("identidad").isInt(min = 13).withMessage("La identidad debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarEmpleado = await ModeloEmpleado.findOne({
                    where: {
                        identidad: value
                    }
                });
                if (!BuscarEmpleado) {
                    throw new Error('La identidad ya existe');
                }
            }
        }),
    body("rtn").isInt(min = 13).withMessage("El rtn debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarEmpleado = await ModeloEmpleado.findOne({
                    where: {
                        rtn: value
                    }
                });
                if (!BuscarEmpleado) {
                    throw new Error('El rtn ya existe');
                }
            }
        }),
    body("primernombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener 3-50 caracteres')
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarEmpleado = await ModeloEmpleado.findOne({
                    where: {
                        primernombre: value
                    }
                });
                if (BuscarEmpleado) {
                    throw new Error('El nombre del primer nombre ya existe');
                }
            }
        }),
    body("primerApellido").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener 3-50 caracteres')
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarEmpleado = await ModeloEmpleado.findOne({
                    where: {
                        primerapellido: value
                    }
                });
                if (BuscarEmpleado) {
                    throw new Error('El nombre del primer apellido ya existe');
                }
            }
        }),
    body("activo").optional().isBoolean().withMessage("Solo se permiten valores booleanos"),
    controladorEmpleado.editar);
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarEmpleado = await ModeloEmpleado.findOne({
                    where: {
                        id: value
                    }
                });
                if (!BuscarEmpleado) {
                    throw new Error('El id del empleado no existe');
                }
            }
        }),
    controladorEmpleado.eliminar);
module.exports = rutas;