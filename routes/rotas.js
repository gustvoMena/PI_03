const express = require("express");
const controlador = require("../controllers/controlador");
const controladorUsuario = require("../controllers/controladorUsuario");
const controladorPedido =require("../controllers/controladorPedido")
const passport = require("passport")
const {cliente}= require("../helpers/acesso")
const {admin}= require("../helpers/acesso")

const rotas = express.Router();

rotas.get("/", controlador.buscarPizzariaBanco);
rotas.post("/",  controlador.inserirPizzariaBanco);
rotas.put("/:id", controlador.atualizarPizzariaBanco);
rotas.delete("/:id", controlador.removerPizzariaBanco);

rotas.get("/cadastrar" ,admin,controlador.cadastro);//cadastro da comida 
rotas.get("/editar/:id" ,admin,controlador.editarFormulario) //retorna a pagina de edição
rotas.post("/ediReq/:id" ,admin,controlador.montarReqEdicao) //monta requisição de edição
rotas.get("/remover/:id", admin,controlador.montarReqDelete)  //monta requisição de remoção 

rotas.get("/FinalizarPedido2", controladorPedido.buscarPedidoBanco);
rotas.post("/FinalizarPedido", controladorPedido.inserirPedidoBanco);
rotas.get("/AcidornarPedido/:id/:descricao/:valor",controladorPedido.AdicionarPedido);


rotas.get("/login",controladorUsuario.mostrarFormLogin)
rotas.post("/cadastrar/usuario", controladorUsuario.inserirUsuarioBanco);
rotas.get("/cadastro/usuario", controladorUsuario.cadastro);

rotas.post("/logar", (req,res,next) => {
    passport.authenticate("local",{
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req,res,next)
})

rotas.get("/logout", (req,res) => {
    req.logout()
    req.flash('success_msg',"Você saiu!")
    res.redirect("/")
})


module.exports = rotas;