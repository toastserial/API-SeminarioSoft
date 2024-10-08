const { Router } = require('express');
const controladorCiudad = require('../controladores/controladorCiudad');
const ModeloCiudad = require('../modelos/ubicacion/ciudad');
const { body, query } = require('express-validator');
const rutas = Router();
rutas.get('/', controladorCiudad.inicio);
rutas.get('/listar', controladorCiudad.listar);
rutas.post('/guardar',
    body("nombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener 3-50 caracteres')
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarCiudad = await ModeloCiudad.findOne({
                    where: {
                        nombre: value
                    }
                });
                if (BuscarCiudad) {
                    throw new Error('El nombre del ciudad ya existe');
                }
            }
        }),
    body("codigo").isInt().withMessage("El codigo debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El codigo no puede ser vacío');
            } else {
                const BuscarCiudad = await ModeloCiudad.findOne({
                    where: {
                        codigo: value
                    }
                });
                if (BuscarCiudad) {
                    throw new Error('El codigo del ciudad ya existe');
                }
            }
        }),
    body("activo").optional().isBoolean().withMessage("Solo se permiten valores booleanos"),
    controladorCiudad.guardar);
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarCiudad = await ModeloCiudad.findOne({
                    where: {
                        id: value
                    }
                });
                if (!BuscarCiudad) {
                    throw new Error('El id del ciudad no existe');
                }
            }
        }),
    body("nombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener 3-50 caracteres')
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarCiudad = await ModeloCiudad.findOne({
                    where: {
                        nombre: value
                    }
                });
                if (BuscarCiudad) {
                    throw new Error('El nombre del ciudad ya existe');
                }
            }
        }),
    body("codigo").isInt().withMessage("El codigo debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarCiudad = await ModeloCiudad.findOne({
                    where: {
                        codigo: value
                    }
                });
                if (!BuscarCiudad) {
                    throw new Error('El codigo del ciudad no existe');
                }
            }
        }),
    body("activo").optional().isBoolean().withMessage("Solo se permiten valores booleanos"),
    controladorCiudad.editar);
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarCiudad = await ModeloCiudad.findOne({
                    where: {
                        id: value
                    }
                });
                if (!BuscarCiudad) {
                    throw new Error('El id del ciudad no existe');
                }
            }
        }),
    controladorCiudad.eliminar);
module.exports = rutas;