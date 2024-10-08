const sequelize = require('sequelize');
const db = require('../../configuracion/db');

const Departamento = db.define(
    "departamento",
    {
        nombre: {
            type: sequelize.STRING(50),
            allowNull: false,
            unique: {
                args: true,
                msg: "Ya existe un departamento con este nombre",
            }
        },
        codigo: {
            type: sequelize.STRING(2),
            allowNull: false,
        },
        activo: {
            type: sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        }
    },
    {
        tableName: "departamentos",
    }
);

module.exports = Departamento;
