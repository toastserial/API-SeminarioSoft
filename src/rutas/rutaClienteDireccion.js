const { Router } = require('express');
const controladorClienteDireccion = require('../controladores/controladorClienteDireccion');
const ModeloClienteDireccion = require('../modelos/clientes/clientedireccion');
const { body, query } = require('express-validator');
const rutas = Router();
rutas.get('/', controladorClienteDireccion.inicio);
rutas.get('/listar', controladorClienteDireccion.listar);
rutas.post('/guardar',
    body("direccion").isLength({ min: 3, max: 50 }).withMessage('La direccion debe tener 3-50 caracteres')
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarClienteDireccion = await ModeloClienteDireccion.findOne({
                    where: {
                        direccion: value
                    }
                });
                if (BuscarClienteDireccion) {
                    throw new Error('La direccion ya existe');
                }
            }
        }),
    body("activo").optional().isBoolean().withMessage("Solo se permiten valores booleanos"),
    controladorClienteDireccion.guardar);
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarClienteDireccion = await ModeloClienteDireccion.findOne({
                    where: {
                        id: value
                    }
                });
                if (!BuscarClienteDireccion) {
                    throw new Error('El id del direccion no existe');
                }
            }
        }),
    body("direccion").isLength({ min: 3, max: 50 }).withMessage('La direccion debe tener 3-50 caracteres')
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarClienteDireccion = await ModeloClienteDireccion.findOne({
                    where: {
                        direccion: value
                    }
                });
                if (BuscarClienteDireccion) {
                    throw new Error('La direccion ya existe');
                }
            }
        }),
    body("activo").optional().isBoolean().withMessage("Solo se permiten valores booleanos"),
    controladorClienteDireccion.editar);
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarClienteDireccion = await ModeloClienteDireccion.findOne({
                    where: {
                        id: value
                    }
                });
                if (!BuscarClienteDireccion) {
                    throw new Error('El id de la direccion no existe');
                }
            }
        }),
    controladorClienteDireccion.eliminar);
module.exports = rutas;