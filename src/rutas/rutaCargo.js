const { Router } = require('express');
const {body, query} = require('express-validator');
const controladorCargo = require('../controladores/controladorCargo');
const ModeloCargo = require('../modelos/cargo');
const rutas = Router();
rutas.get('/', controladorCargo.inicio);
rutas.get('/listar', controladorCargo.listar);
rutas.post('/guardar',
    body("nombre").isLength({min: 3, max: 50}).withMessage('El nombre debe tener entre 3 y 50 caracteres')
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }else{
            const buscarCargo = await ModeloCargo.findOne({
                where: {
                    nombre: value
                }
            });
            if(buscarCargo){
                throw new Error('El nombre del cargo ya existe');
            }
        }
    }),
    body("activo").optional().isBoolean().withMessage("Solo se permiten valores boleanos"),
    controladorCargo.guardar);
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero.")
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }else{
            const buscarCargo = await ModeloCargo.findOne({
                    where: {
                        id: value
                    }
                });
                if(buscarCargo){
                    throw new Error('El id del cargo no existe');
                }
            }
        }),
    body("nombre").isLength({min: 3, max: 50}).withMessage('El nombre debe tener entre 3 y 50 caracteres')
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }else{
            const buscarCargo = await ModeloCargo.findOne({
                    where: {
                        nombre: value
                    }
                });
                if(buscarCargo){
                    throw new Error('El nombre del cargo ya existe');
                }
            }
        }),
        body("activo").optional().isBoolean().withMessage("Solo se permiten valores boleanos"),
        controladorCargo.guardar);
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const buscarCargo = await ModeloCargo.findOne({
                    where: {
                        id: value
                    }
                });
                if (!buscarCargo) {
                    throw new Error('El id del cargo no existe');
                }
            }
        }),
    controladorCargo.eliminar);
module.exports = rutas;