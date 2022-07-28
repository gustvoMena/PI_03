var sequelize = require("sequelize")
var banco = require("../configs/banco-config")

var pizzaria = banco.define("pizzaria",{
    idPizza: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    descricao: {
        type: sequelize.STRING(60),
        allowNull: false,
    },
    valor: {
        type: sequelize.INTEGER(20),
        allowNull: false,
    
    },
    tipoDolanche: {
        type: sequelize.INTEGER,
        allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false
})


pizzaria.sync()

module.exports = pizzaria