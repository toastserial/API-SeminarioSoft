const { Router } = require('express');
const rutas = Router();
rutas.get('/', (req, res) => {
    res.send('Hola Mundo');
});
rutas.get('/otra', (req, res) => {
    var info = {
        nombre: "Juan",
        apellido: "Ochoa",
        clase: {
            codigo: "IF3algo",
            nombre: "Seminario Taller de Software"
        }
    }
    res.send(info);
});
rutas.get('/otra2', (req, res) => {
    var info = {
        nombre: "Juan",
        apellido: "Ochoa",
        clase: {
            codigo: "IF3algo",
            nombre: "Seminario Taller de Software"
        }
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({clase: info.clase.codigo + '  ' + info.clase.nombre});
});
module.exports = rutas;