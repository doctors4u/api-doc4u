
const UsersPanel = require('../models/UsersPanel')
const Users = require('../models/Users')

const { Op } = require('sequelize');

const jwt = require('jsonwebtoken')

class ControllerPanel {
    async storage(req, res) {
        try {

            const existsUser = await UsersPanel.findAll({
                where: {
                    mail: req.body.mail,
                }
            })

            if (existsUser.length > 0 ){
                return res.status(400).json({ message: "Opss.. usuário já existente" })
            }

            const user = await UsersPanel.create(req.body)

            const { id, name, mail } = user

            if (user){
                return res.status(200).json({
                    user: {
                        id,
                        name,
                        mail,
                    },
                    token: jwt.sign({ id }, process.env.PANEL_TOKEN, {
                        expiresIn: '7d'
                    }), message: "Usuário criado com sucesso!"
                })
            }
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Opss.. algo deu errado" })

        }
    }
    async getUsers(req, res) {

        try {

            const users = await UsersPanel.findAll()

            if (users.length > 0) {
                return res.status(200).json(users.map(item => item))
            }

            return res.status(404).json({ message: "Nenhum usuário foi encontrado!" })


        } catch (error) {

            return res.status(500).json({ message: "Opss.. algo deu errado" })

        }

    }
    async getUserById(req,res){

        try {

            const users = await Users.findAll({
                where:{
                    id:req.params.id
                }
            })

            if (users.length > 0) {
                return res.status(200).json(users.map(item => item))
            }

            return res.status(404).json({ message: "Nenhum usuário foi encontrado!" })


        } catch (error) {

            return res.status(500).json({ message: "Opss.. algo deu errado" })

        }


        
    }
    async getUserByName(req,res){

        try {

            const users = await UsersPanel.findAll({
                where:{
                    
                    name: {
                        [Op.like]: `%${req.params.id}%`
                      }

                }
            })

            if (users.length > 0) {
                return res.status(200).json(users.map(item => item))
            }   

            return res.status(404).json({ message: "Nenhum usuário foi encontrado!" })


        } catch (error) {

            return res.status(500).json({ message: "Opss.. algo deu errado" })

        }


        
    }
    async getClientByName(req,res){

        try {

            const users = await Users.findAll({
                where:{
                    
                    name: {
                        [Op.like]: `%${req.params.id}%`
                      }

                }
            })

            if (users.length > 0) {
                return res.status(200).json(users.map(item => item))
            }   

            return res.status(404).json({ message: "Nenhum usuário foi encontrado!" })


        } catch (error) {

            return res.status(500).json({ message: "Opss.. algo deu errado" })

        }


        
    }
    async update(req,res){
        try {

            const verifyUserExists = await UsersPanel.findAll({
                where:{
                    id:req.body.id
                }
            })

            if(verifyUserExists.length == 0){
                return res.status(404).json({message:"Usuário não encontrado!"})
            }


            const users = await  UsersPanel.update({
                
                name:req.body.name,
                cpf:req.body.cpf,
                mail:req.body.mail,
                permission:req.body.permission,
                image:req.body.image,
                password_hash:req.body.password,

            },{
                where:{

                    id:req.body.id

                }
            })

            if(users.length > 0){
                return res.status(200).json({message:"Usuário alterado com sucesso!"})
            }

            return res.status(404).json({message:"Usuário não foi encontrado"})
            
        } catch (error) {
         
            return res.status(500).json({message:"Opss... algo deu errado"})
            
        }
    }
    async removeUser(req,res){
        try {

            const user = await UsersPanel.destroy({
                where:{
                    id:req.params.id
                }
            })

            if(user.length > 0){
                return res.status(200).json({message:"Usuário deletado com sucesso!"})
            }

            return res.status(404).json({message:"Usuário não foi encontrado!"})

            
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:"Opss.. algo deu errado!"})
            
        }
    }
    async removeClient(req,res){
        try {

            const user = await Users.destroy({
                where:{
                    id:req.params.id
                }
            })

            if(user){
                return res.status(200).json({message:"Sucess"})
            }

            return res.status(404).json({message:"Nenhum usuário foi encontrado :("})
            
        } catch (error) {

            return res.status(500).json({message:"Opss.. algo deu errado!"})
            
        }
    }

    async blockClient(req,res){
        try {

            const client = await Users.update({

                status:2

            },{
                where:{
                    id:req.body.id
                }
            })

            if(client.length > 0){
                return res.status(200).json({message:"Usuário alterado com sucesso!"})
            }

            return res.status(404).json({message:"Opss.. nenhum usuário foi encontrado :0("})
            
        } catch (error) {
            
            return res.status(500).json({message:"Opss... algo deu errado!"})

        }
    }

}

module.exports = new ControllerPanel()
