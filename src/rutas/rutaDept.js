const { Router } = require('express');
const controladorDept = require('../controladores/controladorDepartamento');
const ModeloDept = require('../modelos/ubicacion/departamento');
const { body, query } = require('express-validator');
const rutas = Router();
rutas.get('/', controladorDept.inicio);
rutas.get('/listar', controladorDept.listar);
rutas.post('/guardar',
    body("nombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener 3-50 caracteres')
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarDept = await ModeloDept.findOne({
                    where: {
                        nombre: value
                    }
                });
                if (BuscarDept) {
                    throw new Error('El nombre del departamento ya existe');
                }
            }
        }),
    body("codigo").isInt().withMessage("El codigo debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El codigo no puede ser vacío');
            } else {
                const BuscarDept = await ModeloDept.findOne({
                    where: {
                        codigo: value
                    }
                });
                if (BuscarDept) {
                    throw new Error('El codigo del departamento ya existe');
                }
            }
        }),
    body("activo").optional().isBoolean().withMessage("Solo se permiten valores booleanos"),
    controladorDept.guardar);
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarDept = await ModeloDept.findOne({
                    where: {
                        id: value
                    }
                });
                if (!BuscarDept) {
                    throw new Error('El id del departamento no existe');
                }
            }
        }),
    body("nombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener 3-50 caracteres')
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarDept = await ModeloDept.findOne({
                    where: {
                        nombre: value
                    }
                });
                if (BuscarDept) {
                    throw new Error('El nombre del departamento ya existe');
                }
            }
        }),
    body("codigo").isInt().withMessage("El codigo debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarDept = await ModeloDept.findOne({
                    where: {
                        codigo: value
                    }
                });
                if (!BuscarDept) {
                    throw new Error('El codigo del departamento no existe');
                }
            }
        }),
    body("activo").optional().isBoolean().withMessage("Solo se permiten valores booleanos"),
    controladorDept.editar);
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarDept = await ModeloDept.findOne({
                    where: {
                        id: value
                    }
                });
                if (!BuscarDept) {
                    throw new Error('El id del departamento no existe');
                }
            }
        }),
    controladorDept.eliminar);
module.exports = rutas;