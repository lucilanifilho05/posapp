const express = require ("express");
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')

//config
    //Template Engine
        app.engine("handlebars", handlebars.engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    // Body Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())
//Rotas
    app.get('/cad', function(req, res){
        res.render('formulario')
    })

    app.post('/add', function(req, res){
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function(){
            res.redirect('/')
        }).catch(function(erro){
            res.send("Houve um erro: " + erro)
        })
    })

    app.get('/', function(req, res){
        Post.findAll().then(function(posts){
            res.render('home', {posts: posts})
        }).catch(function(erro){
            res.send("Houve um erro: " + erro)
        })
    })

    app.get('/deletar/:id', function(req, res){
        Post.destroy({where: {'id': req.params.id}}).then(function(){
            res.redirect('/')
        }).catch(function(erro){
            res.send("Houve um erro: " + erro)
        })
    })

    app.get('/editar/:id', function(req, res){
        Post.findOne({where: {'id': req.params.id}}).then(function(posts){
            res.render('editarpost', {posts: posts})
        }).catch(function(erro){
            res.send("Houve um erro: " + erro)
        })
    })

    app.post('/editar', function(req, res){
        Post.update(
            {
                'titulo': req.body.titulo, 
                'conteudo': req.body.conteudo
            },
            {
            where: {'id': req.body.id},
            }
        ).then(function(){
            res.redirect('/')
        }).catch(function(erro){
            res.send("Houve um erro: " + erro)
        })
    })



app.listen(8081, function(){
    console.log("Servidor rodando na url: http://localhost:8081");
})