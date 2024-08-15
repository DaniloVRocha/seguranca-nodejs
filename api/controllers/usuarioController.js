const UsuarioService = require("../services/usuarioService");
const usuarioService =  new UsuarioService();

class usuarioController{
    static async cadastrar(req,res){
        const { nome, email, senha } = req.body;

        try{
            const usuario = await usuarioService.cadastrar({ nome, email, senha })
            res.status(201).send(usuario)
        }catch(error){
            res.status(400).send( { message:error.message } )
        }
    }

    static async buscarTodos(req, res){
        try{
            const usuarios = await usuarioService.buscar();
            res.status(200).send(usuarios)
        }catch(error){
            res.status(500).send( { message:error.message } )
        }
    }

    static async buscarPorId(req, res){
        const { id } = req.params;
        try{
            const usuario = await usuarioService.buscarPorId(id);
            res.status(200).send(usuario)
        }catch(error){
            res.status(500).send( { message:error.message } )
        }

    }

    static async deletarUsuario(req, res){
        const { id } = req.params;
        try{
            await usuarioService.deletarUsuario(id);
            res.status(200).send({message: "Usuario Deletado com sucesso."})
        }catch(error){
            res.status(500).send( { message:error.message } )
        }

    }

    static async editarUsuario(req, res) {
        const { id } = req.params
        const { nome, email } = req.body
        
        try {
            const usuario = await usuarioService.editarUsuario({ id, nome, email })
            res.status(200).json(usuario)
        } catch (error) {
            console.log('Message error: ', error.message)
            res.status(400).send({ message: error.message })
        }
    }
}
module.exports = usuarioController;