const database = require("../models")
const {hash} = require('bcryptjs')
const uuid = require("uuid")

class usuarioService{
    async cadastrar(dto){
        const usuario = await database.usuarios.findOne({
            where:{
                email: dto.email
            }
        })

        if(usuario){
            throw new Error('Usuario já cadastrado.')
        }

        try{
            const senhahash = await hash(dto.senha, 8)
            const novoUsuario = await database.usuarios.create({
                id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhahash
            })
            return novoUsuario
        }catch(error){
            throw new Error("Erro ao cadastrar usuário.")
        }
    }

    async buscar(){
        const usuarios = await database.usuarios.findAll()
        return usuarios;
    }

    async buscarPorId(id){
        const usuario = await database.usuarios.findOne({
            where:{
                id: id
            }
        })

        if(!usuario){
            throw new Error('O usuário não existe.')
        }
        return usuario;
    }

    async deletarUsuario(id){
        const usuario = await database.usuarios.findOne({
            where:{
                id: id
            }
        })

        if(!usuario){
            throw new Error('O usuário não existe.')
        }
        try{
            await database.usuarios.destroy({
                where: {
                    id: id
                }
            });
        }catch(erro){
            throw new Error('Erro ao deletar usuário.')
        }

    }

    async editarUsuario(dto) {
        const usuario = await database.usuarios.findOne({
            where: {
                id: dto.id
            }
        });

        if (!usuario) {
            throw new Error('O usuário não existe!')
        }

        try {
            usuario.nome = dto.nome
            usuario.email = dto.email

            await usuario.save()

            return await usuario.reload()
        } catch (error) {
            console.error('Message error: ', error.message)
            throw error
        }
    }
}

module.exports = usuarioService;