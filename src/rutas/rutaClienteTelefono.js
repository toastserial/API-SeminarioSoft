const { Router } = require('express');
const controladorClienteTelefono = require('../controladores/controladorClienteTelefono');
const ModeloClienteTelefono = require('../modelos/clientes/clientetelefono');
const { body, query } = require('express-validator');
const rutas = Router();
rutas.get('/', controladorClienteTelefono.inicio);
rutas.get('/listar', controladorClienteTelefono.listar);
rutas.post('/guardar',
    body("numero").isInt().withMessage('El numero debe tener 8 caracteres')
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarClienteTelefono = await ModeloClienteTelefono.findOne({
                    where: {
                        numero: value
                    }
                });
                if (BuscarClienteTelefono) {
                    throw new Error('El numero ya existe');
                }
            }
        }),
    controladorClienteTelefono.guardar);
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarClienteTelefono = await ModeloClienteTelefono.findOne({
                    where: {
                        id: value
                    }
                });
                if (!BuscarClienteTelefono) {
                    throw new Error('El id del numero del cliente no existe');
                }
            }
        }),
    body("numero").isInt().withMessage('El numero debe tener 8 caracteres')
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarClienteTelefono = await ModeloClienteTelefono.findOne({
                    where: {
                        numero: value
                    }
                });
                if (BuscarClienteTelefono) {
                    throw new Error('El numero ya existe');
                }
            }
        }),
    controladorClienteTelefono.editar);
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const BuscarClienteTelefono = await ModeloClienteTelefono.findOne({
                    where: {
                        id: value
                    }
                });
                if (!BuscarClienteTelefono) {
                    throw new Error('El id del barrio no existe');
                }
            }
        }),
    controladorClienteTelefono.eliminar);
module.exports = rutas;