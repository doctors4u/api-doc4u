
const Plans = require("../models/Plans")
const UsersPlans = require("../models/UsersPlans")
const Dependents = require("../models/Dependents")
const apirapidoc = require("../../services/apirapidoc")
class ControllerPlans{
    
    async storage(req,res){

        try {


            const plan = await Plans.create(req.body)
            if(plan){
                return res.status(200).json({message:"Sucess"})
            }
            return res.status(400).json()
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:"Opss.. algo deu errado :("})

        }

    }
    async getAll(req, res) {
        try {
            const plans = await Plans.findAll({
                order: [['id', 'DESC']]  // Ordena por 'nome' em ordem crescente (ASC)
            });
    
            if (plans.length > 0) {
                return res.status(200).json(plans);
            }
    
            return res.status(404).json({ message: "Nenhum plano foi encontrado :(" });
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ops... algo deu errado! :(" });
        }
    }
    

    async getDependents(req,res){
        try {

            const depedents = await Dependents.findAll({
                where:{
                    uuid:req.params.id
                }
            })

            if(depedents.length > 0) {
                return res.status(200).json(depedents.map(item => item))
            }

            return res.status(404).json({message:"Nenhum dependente foi encontrado :("})
     
        } catch (error) {
            
        }
    }

    async storageRapidoc(req, res) {
        try {
            const dependents = await Dependents.findAll({
                where: {
                    uuid: req.body.id
                }
            });

            console.log(dependents)
    
            if (!dependents || dependents.length === 0) {
                return res.status(404).json({ error: 'Dependents not found' });
            }
    
            // Verificar se há campos vazios
            let hasEmptyFields = false;
            dependents.forEach(dependent => {
                if (dependent.birthday == null || dependent.phone == null || dependent.city == null || dependent.state == null || dependent.zipCode == null) {
                    hasEmptyFields = true;
                    // Você pode parar a verificação aqui se desejar
                    return;
                }
            });
    
            if (hasEmptyFields) {
                return res.status(400).json({ error: 'Dependents have empty fields' });
            }

            await Dependents.update({
                status:1
            },{
                where:{
                    uuid: req.body.id
                }
            })
            

            const formattedDependents = dependents.map(dependent => ({
                name: dependent.name,
                cpf: dependent.cpf,
                birthday: dependent.birthday,
                phone: dependent.phone,
                email: dependent.mail,
                zipCode: dependent.zipCode,
                address: dependent.address,
                city: dependent.city,
                state: dependent.state
            }));
    

            
            const response = await apirapidoc.post("tema/api/beneficiaries", formattedDependents);


            return res.status(200).json(dependents);
        } catch (error) {
            console.error("Error fetching dependents:", error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getDepedent(req,res){
        try {

            const dependent = await Dependents.findAll({
                where:{
                    cpf:req.body.cpf
                }
            })

            console.log(dependent)
            

            if(dependent.length > 0){
                return res.status(400).json({message:"Não autorizado"})
            }

            return res.status(200).json({message:"Sucess"})


            
        } catch (error) {
            
        }
    }

    async updateDependent(req,res){
        try {

            const { id, field } = req.body;
            
            console.log(req.body)

            const dependent = await Dependents.update(field,{
                where:{
                    id:id
                }
            })

            if(dependent.length > 0){
                console.log("SUCESSSS ***")
                return res.status(200).json({message:"Sucess"})
            }

            
        } catch (error) {
            
        }
    }

    async storagePlan(req,res){
        try {

            const verifyExistsUserPlan = await UsersPlans.findAll({
                where:{
                    id:req.body.id
                }
            })

            if(verifyExistsUserPlan.length == 0){
                return res.status(401).json({message:"Não autorizado!"})
            }

            const createDepents = await Dependents.create(req.body )

            
        } catch (error) {
            
        }
    }

}

module.exports = new ControllerPlans()