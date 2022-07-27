var pedido = require('../models/pedido');
var item = require("../models/pizzaria")

const { Op } = require("sequelize");



var AddArrayPedido = []
const pedidoControlador = {};

//CREATE

pedidoControlador.inserirPedidoBanco = async function (req, res) {
    idsItens = [1,2,3]
   
    var valorTotal = 0

    item.findAll({
        raw: true
    }).then(
        function(itens){
           


        }
    ).catch(
        function(erro){
            res.status(500).send(`Erro ao buscar as  comidas da pizzaria: ${erro}`)
        }
    )


   await pedido.create({
     idPedido:3,   
     valor:valorTotal,
        idCliente:1
    
    }).then(
        function(){
             console.log("pedido Criado")
            res.status(200).render("finalizacao",{pedidos: item,descricao,valor});
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao criar pedido " + error);
        }
    )

   await pedido.findByPk(3).then((dados)=>{
        _pedido = dados
        return  item.findAll({
           where: {
            idPizza:{
                [Op.or]:AddArrayPedido
            }
           } 
        })
    }).then((itens)=>{
        _pedido.addPizzaria(itens)
    }).catch((erro)=>{
        console.log(erro)
    })    

}



//READ
pedidoControlador.buscarPedidoBanco = function(req,res){
  
    pedido.findByPk(2,{include:item}).then((_pedido)=>{
console.log(_pedido.pizaria[2].descricao)
console.log(_pedido.pizaria[2].valor)
    }).catch((erro)=>{
        console.log(erro)
    })
}


pedidoControlador.AdicionarPedido = function(req,res){
    pedido.findOne({
        raw: true,
        where: {
            idPedido: req.params.id,
        }
    }).then(
        function(  ){
            AddArrayPedido.push(req.params.id,req.params.descricao,req.params.valor)
            console.log(AddArrayPedido)
            res.status(200).redirect("/")  
          
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao acessar adiconar pedido no array " + error)
        }
    )

 }



module.exports = pedidoControlador;