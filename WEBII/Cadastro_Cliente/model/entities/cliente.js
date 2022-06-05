
const Sequelize = require('sequelize');
const database = require('./dborm');

const Cliente = database.sequelize.define('cliente', {
    id: {
        type: Sequelize.INTEGER,
        autoIcrement: true,
        allowNoll: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idade: {
        type: Sequelize.INTEGER
    },
    endereco: Sequelize.STRING
});

module.exports = {Cliente} 