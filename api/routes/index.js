const bodyParser = require('body-parser')
 
const produto = require('./produtoRoute')
const usuarios = require('./usuariosRoute')
const role = require('./role')
const auth = require('./authRoutes')
const permissao  = require ('./permissoes')
const seguranca = require('./seguranca')

module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    usuarios,
    produto,
    role,
    permissao,
    seguranca
  )
}
