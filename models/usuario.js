var sequelize = require("sequelize")
var banco = require("../configs/banco-config")

var usuario = banco.define("usuario",{
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    cpf: {
        type: sequelize.STRING(40),
        allowNull: false,
        
    },
    nome: {
        type: sequelize.STRING(50),
        allowNull: false,
        
    },
    email: {
        type: sequelize.STRING(50),
        allowNull: false,
    },
    login: {
        type: sequelize.INTEGER,
        allowNull: false,
    },
    senha: {
        type: sequelize.STRING,
        allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false
})

usuario.sync() //cria a tabela

module.exports = usuario