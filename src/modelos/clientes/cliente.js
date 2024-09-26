const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Cliente = db.define(
    "cliente",
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
        tableName: "clientes",
    }
);

module.exports = Cliente;
