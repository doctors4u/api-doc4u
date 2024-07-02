
const Services = require("../models/Services")

class ControllerServices{

    async storage(req,res){
        try {

            const service = await Services.create(req.body)

            if(service){
                return res.status(200).json({message:"Sucess"})
            }

        
        } catch (error) {

            return res.status(500).json({message:"Opss.. algo deu errado :("})
            
        }
    }

}

module.exports = new ControllerServices()