const sequelize = require('sequelize');
const db = new sequelize(
    "seminario",//Nombre de la base de datos
    "root",//Usuario de la base de datos
    "Iamtheone321.",//Contraseña de la base de datos
    {
        host: "localhost",//Host de la base de datos
        port: 3306,//Puerto de la base de datos
        dialect: "mysql",//Dialecto de la base de datos
    }
);
module.exports = db;