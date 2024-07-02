const Users = require('../models/Users')
const jwt = require('jsonwebtoken')

class ControllerUsers {
    async storage(req, res) {
        try {

            const existsUser = await Users.findAll({
                where: {
                    mail: req.body.mail,
                }
            })

            if (existsUser.length > 0)
                return res.status(400).json({ message: "Opss.. usuário já existente" })

            const user = await Users.create(req.body)

            const { id, name, mail } = user

            
            if (user){
                return res.status(200).json({
                    user: {
                        id,
                        name,
                        mail,
                    },
                    token: jwt.sign({ id }, process.env.CLIENT_TOKEN, {
                        expiresIn: '7d'
                    }), message: "Usuário criado com sucesso!"
                })
            }

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: error })

        }
    }
    async getAll(req,res){
        try {

            const users = await Users.findAll()

            if(users.length > 0){
                return res.status(200).json(users.map(item => item))
            }

            return res.status(404).json({message:"Opss... nenhum usuário foi encontrado :("})

            
        } catch (error) {
            
        }
    }
    async getUser(req, res) {
        try {
            const { user_id } = req.body

            const user = await Users.findByPk(user_id, {
                attributes: { exclude: ['password'] }
            })

            return res.status(200).json({
                user
            })
        } catch (error) {
            return res.status(500).json({
                message: "Opss algo deu errado!"
            })
        }
    }
    async getUserByMail(req, res) {
        try {
            const { mail } = req.body

            const user = await Users.findAll({
                where: {
                    mail
                }
            })

            if (user.length > 0)
                return res.status(200).json(user.map(item => item))

            return res.status(404).json({
                message: "Usuário não encontrado!"
            })
        } catch (error) {
            return res.status(500).json({
                message: "Opss algo deu errado!"
            })
        }
    }
    async getUserById(req, res) {
        try {
            const user = await Users.findAll({
                where: {
                    id:req.params.id
                }
            })

            if (user.length > 0)
                return res.status(200).json(user.map(item => item))

            return res.status(404).json({
                message: "Usuário não encontrado!"
            })
        } catch (error) {
            return res.status(500).json({
                message: "Opss algo deu errado!"
            })
        }
    }
    async update(req,res){
        try {
            const { user_id } = req.body
            const user = await Users.update(req.body, {
                where: {
                    id: user_id
                }
            })

            if(user.length > 0){
                return res.status(200).json({message:"Usuário atualizado com sucesso!"})
            }

            return res.status(404)
            
        } catch (error) {
            
        }
    }


}

module.exports = new ControllerUsers()
