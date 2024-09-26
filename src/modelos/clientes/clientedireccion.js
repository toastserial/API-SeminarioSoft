const sequelize = require('sequelize');
const db = require('../../configuracion/db');

const ClienteDireccion = db.define(
    "clienteDireccion",
    {
        direccion: {
            type: sequelize.TEXT,
            allowNull: true,
        },
        activo: {
            type: sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        }
    },
    {
        tableName: "clienteDirecciones",
    }
);

module.exports = ClienteDireccion;