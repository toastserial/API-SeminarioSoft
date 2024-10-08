const { Router } = require('express');
const {body, query} = require('express-validator');
const controladorBarrio = require('../controladores/controladorBarrio');
const ModeloBarrio = require('../modelos/ubicacion/barrio');
const rutas = Router();
rutas.get('/', controladorBarrio.inicio);
rutas.get('/listar', controladorBarrio.listar);
rutas.post('/guardar',
    body("nombre").isLength({min: 3, max: 50}).withMessage('El nombre debe tener entre 3 y 50 caracteres')
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }else{
            const buscarBarrio = await ModeloBarrio.findOne({
                where: {
                    nombre: value
                }
            });
            if(buscarBarrio){
                throw new Error('El nombre del barrio ya existe');
            }
        }
    }),
    body("activo").optional().isBoolean().withMessage("Solo se permiten valores boleanos"),
    controladorBarrio.guardar);
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero.")
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }else{
            const buscarBarrio = await ModeloBarrio.findOne({
                    where: {
                        id: value
                    }
                });
                if(buscarBarrio){
                    throw new Error('El id del barrio no existe');
                }
            }
        }),
    body("nombre").isLength({min: 3, max: 50}).withMessage('El nombre debe tener entre 3 y 50 caracteres')
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }else{
            const buscarBarrio = await ModeloBarrio.findOne({
                    where: {
                        nombre: value
                    }
                });
                if(buscarBarrio){
                    throw new Error('El nombre del barrio ya existe');
                }
            }
        }),
        body("activo").optional().isBoolean().withMessage("Solo se permiten valores boleanos"),
        controladorBarrio.guardar);
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El nombre no permite valores nulos');
            } else {
                const buscarBarrio = await ModeloBarrio.findOne({
                    where: {
                        id: value
                    }
                });
                if (!buscarBarrio) {
                    throw new Error('El id del barrio no existe');
                }
            }
        }),
    controladorBarrio.eliminar);
module.exports = rutas;