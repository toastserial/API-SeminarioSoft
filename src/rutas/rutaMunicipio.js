const { Router } = require('express');
const controladorMunicipio = require('../controladores/controladorMunicipio');
const ModeloMunicipio = require('../modelos/ubicacion/municipio');
const { body, query } = require('express-validator');
const rutas = Router();
rutas.get('/', controladorMunicipio.inicio);
rutas.get('/listar', controladorMunicipio.listar);
rutas.post('/guardar',
    body("nombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener 3-50 caracteres')
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarMunicipio = await ModeloMunicipio.findOne({
                    where: {
                        nombre: value
                    }
                });
                if (BuscarMunicipio) {
                    throw new Error('El nombre del municipio ya existe');
                }
            }
        }),
    body("codigo").isInt().withMessage("El codigo debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El codigo no puede ser vacío');
            } else {
                const BuscarMunicipio = await ModeloMunicipio.findOne({
                    where: {
                        codigo: value
                    }
                });
                if (BuscarMunicipio) {
                    throw new Error('El codigo del municipio ya existe');
                }
            }
        }),
    body("activo").optional().isBoolean().withMessage("Solo se permiten valores booleanos"),
    controladorMunicipio.guardar);
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarMunicipio = await ModeloMunicipio.findOne({
                    where: {
                        id: value
                    }
                });
                if (!BuscarMunicipio) {
                    throw new Error('El id del municipio no existe');
                }
            }
        }),
    body("nombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener 3-50 caracteres')
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarMunicipio = await ModeloMunicipio.findOne({
                    where: {
                        nombre: value
                    }
                });
                if (BuscarMunicipio) {
                    throw new Error('El nombre del municipio ya existe');
                }
            }
        }),
    body("codigo").isInt().withMessage("El codigo debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarMunicipio = await ModeloMunicipio.findOne({
                    where: {
                        codigo: value
                    }
                });
                if (!BuscarMunicipio) {
                    throw new Error('El codigo del municipio no existe');
                }
            }
        }),
    body("activo").optional().isBoolean().withMessage("Solo se permiten valores booleanos"),
    controladorMunicipio.editar);
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarMunicipio = await ModeloMunicipio.findOne({
                    where: {
                        id: value
                    }
                });
                if (!BuscarMunicipio) {
                    throw new Error('El id del municipio no existe');
                }
            }
        }),
    controladorMunicipio.eliminar);
module.exports = rutas;