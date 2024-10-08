const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Empleado = db.define(
    "empleado",
    {
        identidad:{
            type: sequelize.STRING(15),
            allowNull: true,
        },
        rtn:{
            type: sequelize.STRING(16),
            allowNull: true,
        },
        primernombre: {
            type: sequelize.STRING(50),
            allowNull: false,
        },
        segundoNombre: {
            type: sequelize.STRING(50),
            allowNull: true,
        },
        primerApellido: {
            type: sequelize.STRING(50),
            allowNull: false,
        },
        segundoApellido: {
            type: sequelize.STRING(50),
            allowNull: true,
        },
        sueldo: {
            type: sequelize.DOUBLE,
            allowNull: true,
            defaultValue: 0,
        },
        estado: {
            type: sequelize.ENUM('AC','IN','BL'),
            allowNull: true,
            defaultValue: 'AC',
        },
        imagen: {
            type: sequelize.STRING(255),
            allowNull: true,
        }
    },
    {
        tableName: "empleados",
    }
);

module.exports = Empleado;
