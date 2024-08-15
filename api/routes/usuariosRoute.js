const { Router } = require('express')
const usuarioController = require('../controllers/usuarioController')
const autenticado = require('../middleware/autenticado')
const roles = require('../middleware/roles')
const permissoes = require('../middleware/permissoes')

const router = Router()

router.use(autenticado);

router
  .post('/usuarios', usuarioController.cadastrar)
  .get('/usuarios', permissoes(["listar"]),  usuarioController.buscarTodos)
  .get('/usuarios/id/:id', usuarioController.buscarPorId)
  .delete('/usuarios/id/:id', usuarioController.deletarUsuario)
  .put('/usuarios/id/:id', usuarioController.editarUsuario)

module.exports = router