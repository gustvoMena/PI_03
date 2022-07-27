var sequelize = require("sequelize")
var banco = require("../configs/banco-config")

var usuario =require("../models/usuario")
var pizzaria =require("../models/pizzaria")//itens

var pedido = banco.define("pedido",{
    idPedido: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    valor: {
        type: sequelize.INTEGER,
        allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false
})


//relacionamento-pedido/usuario
usuario.hasMany(pedido,{
    foreignKey:"idCliente"
})


pedido.belongsTo(usuario,{
    foreignKey:"idCliente"
})


//relacinamento pedido/itens
pizzaria.belongsToMany(pedido,{
    through:"PedidosItens"
})


pedido.belongsToMany(pizzaria,{
    through:"PedidosItens", 
    
})





//banco.sync()

module.exports = pedido