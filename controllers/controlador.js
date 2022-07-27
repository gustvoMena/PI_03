var pizzaria = require('../models/pizzaria');
var axios = require("axios")
var qs = require("querystring");
const pedido = require('../models/pedido');


const pizzariaControlador = {};

var AddArrayPedido = []


//CREATE
pizzariaControlador.inserirPizzariaBanco = function (req, res) {
    pizzaria.create({
        descricao: req.body.descricao,
        valor: req.body.valor,
        tipoDolanche:req.body.tipoDolanche
    
    }).then(
        function(){
            res.status(200).redirect("/");
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao inserir comida " + error);
        }
    )
}


//READ
pizzariaControlador.buscarPizzariaBanco = function(req,res){
    pizzaria.findAll({
        raw: true
    }).then(
        function(dados){
            res.render("inicio",{pizzaria: dados})
        }
    ).catch(
        function(erro){
            res.status(500).send(`Erro ao buscar as  comidas da pizzaria: ${erro}`)
        }
    )
}

//UPDATE
pizzariaControlador.atualizarPizzariaBanco = function (req, res) {
    pizzaria.update({
        descricao: req.body.descricao,
        valor: req.body.valor,
        tipoDolanche:req.body.tipoDolanche
    },{
        where: {
            idPizza: req.params.id
        }
    }).then(
        function(){
            res.sendStatus(200)
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao atualizar ao atulizar comida " + error)
        }
    )
}

//DELETE
pizzariaControlador.removerPizzariaBanco = function (req, res) {
    pizzaria.destroy(
        {
        where: {
            idPizza: req.params.id
        }
    }).then(
        function(){
            res.sendStatus(200)
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao remover a comida  " + error)
        }
    )
}

//métodos do handlebars
pizzariaControlador.cadastro = function (req, res) {
    try {
        res.render("cadastro")
    } catch (error) {
        res.status(500).send("Erro ao acessar página de cadastro: " + error);
    }
};

//solicitarEditarFormulario
pizzariaControlador.editarFormulario = function(req,res){
    pizzaria.findOne({
        raw: true,
        where: {
            idPizza: req.params.id
        }
    }).then(
        function(pizza){
            res.render("editarForm",{
                idPizza: req.params.id,
                descricao: pizza.descricao,
                valor: pizza.valor,
                tipoDolanche:pizza.tipoDolanche
               
            })
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao acessar página de edição: " + error)
        }
    )
}

//montarRequisiçãoEditar
pizzariaControlador.montarReqEdicao = function (req, res) {
    axios.put("/" + req.params.id,
        qs.stringify({
                 descricao: req.body.descricao,
                    valor: req.body.valor,
                  tipoDolanche:req.body.tipoDolanche
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            proxy:{
                host: "localhost",
                port: 3000
            }
        }
    ).then(function () {
            res.status(200).redirect("/")
        })
    .catch(function (err) {
        res.status(500).send("Erro ao editar Uma comida " + err);
    })
}

//montarRequisiçãoRemover
pizzariaControlador.montarReqDelete = function (req, res) {
    axios.delete('/' + req.params.id,{
        proxy:{
            host: "localhost",
            port: 3000
        }
        
    }).then(function () {
            res.status(200).redirect("/")
        })
        .catch(function (err) {
            res.status(500).send("Erro ao apagar uma comida " + err);
        })
}




pizzariaControlador.AdicionarPedido = function(req,res){
   
    
    pizzaria.findOne({
        raw: true,
        where: {
            idPizza: req.params.id,
            
        }
    }).then(
        function(  ){
            AddArrayPedido.push(req.params.id)
            console.log(AddArrayPedido)
            res.status(200).redirect("/")  
          
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao acessar adiconar pedido no array " + error)
        }
    )

 }


module.exports = pizzariaControlador;
    

