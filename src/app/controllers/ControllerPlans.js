
const Plans = require("../models/Plans")
const UsersPlans = require("../models/UsersPlans")
const Dependents = require("../models/Dependents")
const Schedules = require("../models/Schedules")
const apirapidoc = require("../../services/apirapidoc")
class ControllerPlans {

    async storage(req, res) {

        try {

            const formattedPrice = String(req.body.price).replace(",","")
            const calc =  (Number(formattedPrice) / 100)

            const plan = await Plans.create({
                name:req.body.name,
                psychology:1,
                nutritionist:1,
                clinical:1,
                qtd_dependents:req.body.qtd_dependents,
                extra_life:req.body.extra_life,
                price:calc
            })
            if (plan) {
                return res.status(200).json({ message: "Sucess" })
            }
            return res.status(400).json()

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Opss.. algo deu errado :(" })

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
    async getDependents(req, res) {
        try {

            const depedents = await Dependents.findAll({
                where: {
                    uuid: req.params.id
                }
            })

            if (depedents.length > 0) {
                return res.status(200).json(depedents.map(item => item))
            }

            return res.status(404).json({ message: "Nenhum dependente foi encontrado :(" })

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
                status: 1
            }, {
                where: {
                    uuid: req.body.id
                }
            })

            function convertDate(data) {
                const [dia, mes, ano] = data.split('/');
                return `${ano}-${mes}-${dia}`;
            }

            function convertPhone(data) {
                // Remove todos os caracteres não numéricos
                const formattedData = String(data).replace(/[^\d]/g, '');
                return formattedData;
            }

            function convertZipCode(data) {
                const formmatedZipCode = String(data).replace("-", "")
                return formmatedZipCode
            }

            const formattedDependents = dependents.map(dependent => ({

                "name": dependent.name,
                "cpf": String(dependent.cpf).replace(".", "").replace(".", "").replace("-", ""),
                "birthday": convertDate(dependent.birthday),
                "phone": convertPhone(dependent.phone),
                "email": dependent.mail,
                "zipCode": convertZipCode(dependent.zipCode),
                "address": dependent.address,
                "city": dependent.city,
                "state": dependent.state,
                "serviceType":"GSP"
            }));


            const response = await apirapidoc.post("tema/api/beneficiaries", formattedDependents);

            console.log(response)

            if (response.data.success == "false") {
                return res.status(500).json({ message: "Opss.. algo deu errado!" })
            }

        if(update.length > 0){
            return res.status(200).json({message:"Sucess"})
        }



            if (response.data.success) {
                const beneficiaries = response.data.beneficiaries;
            
                // Usando Promise.all para lidar com várias operações assíncronas em paralelo
                    await Promise.all(beneficiaries.map(async item => {
                        
                        const response =  await Dependents.update(
                            {
                                clientId: item.clientId,
                                uuid_rapidoc: item.uuid
                            },
                            {
                                where: {
                                    cpf: item.cpf
                                }
                            }
                        );

                        return response

                    })
                )

                return res.status(200).json({ message: "Sucess" });
                
                                        
            }



        } catch (error) {
            console.error("Error fetching dependents:", error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getScheduleHoursRapiDoc(req,res){
        try {

            const date = new Date()

            const formattedDate = date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              });


            const response = await apirapidoc.get(`tema/api/specialty-availability?specialtyUuid=${req.body.specialty_uuid}&dateInitial=${formattedDate}&dateFinal=${formattedDate}&beneficiaryUuid=${req.body.client_uuid}`)
            // const response = await apirapidoc.get(`tema/api/specialty-availability?specialtyUuid=${req.body.specialty_uuid}&dateInitial=14/05/2024&dateFinal=&beneficiaryUuid=${req.body.client_uuid}`)
            

            if (response.status === 200) {
                const data = response.data.map(item => {
                  // Processar cada item, se necessário
                  return {
                    uuid: item.uuid,
                    date: item.date,
                    from: item.from,
                    to: item.to,
                  };
                });
              
                console.log(data); // Exibir os dados no console
              
                return res.status(200).json(data); // Retornar os dados como resposta JSON
              }
      

            return res.status(404).json({message:"Nenhum agendamento disponivel... :("})


        } catch (error) {
            
        }
    }
    async storageScheduleRapidoc(req, res) {
        try {


            const {user_id} = req.body
            
            const dependent = await Dependents.findAll({
                where:{
                    id:user_id
                }
            })

            if(dependent.length > 0){

                console.log("========================")
                console.log(req.body)
                console.log("========================")

                const response = await apirapidoc.post("tema/api/appointments", {
                    "beneficiaryUuid": req.body.client_uuid,
                    "specialtyUuid": req.body.specialty_uuid,
                    "availabilityUuid": req.body.schedule_uuid,
                    "approveAdditionalPayment": true
                });
        
                console.log(response)

                if (response.status === 422) {
                    return res.status(401).json({ message: "Usuário já possui um agendamento" });
                }
        
                const { beneficiary, professional, detail, status, beneficiaryUrl } = response.data;
        
                // Verifique se todos os dados necessários estão presentes
                if (!beneficiary || !professional || !detail || !status || !beneficiaryUrl) {
                    console.error("Dados incompletos retornados pela API:", response.data);
                    return res.status(500).json({ message: "Erro nos dados retornados pela API" });
                }
        
                // Verifique se a propriedade specialties existe e tem pelo menos um item
                if (!professional.specialties || !professional.specialties[0] || !professional.specialties[0].name) {
                    console.error("Dados incompletos do profissional retornados pela API:", response.data);
                    return res.status(500).json({ message: "Erro nos dados do profissional retornados pela API" });
                }
        
                const schedule = await Schedules.create({
                    name: beneficiary.name,
                    status: status,
                    doctor: professional.name,
                    specialtie: professional.specialties[0].name,
                    date: detail.date,
                    from: detail.from,
                    to: detail.to,
                    beneficiaryUrl: beneficiaryUrl,
                    user_id:dependent[0].dataValues.uuid
                });
        
                if (schedule) {
                    return res.status(200).json({ message: "Sucess" });
                }
            }

            return res.status(401).json({message:"Não autorizado"})


           
        } catch (error) {
            console.error("Erro ao criar o agendamento:", error);
            return res.status(500).json({ message: "Erro ao criar o agendamento" });
        }
    }
    async getDepedent(req, res) {
        try {

            const dependent = await Dependents.findAll({
                where: {
                    cpf: req.body.cpf
                }
            })

            console.log(dependent)


            if (dependent.length > 0) {
                return res.status(400).json({ message: "Não autorizado" })
            }

            return res.status(200).json({ message: "Sucess" })



        } catch (error) {

        }
    }
    async updateDependent(req, res) {
        try {

            const { id, field } = req.body;

            console.log(req.body)

            const dependent = await Dependents.update(field, {
                where: {
                    id: id
                }
            })

            if (dependent.length > 0) {
                console.log("SUCESSSS ***")
                return res.status(200).json({ message: "Sucess" })
            }


        } catch (error) {

        }
    }
    async storagePlan(req, res) {
        try {

            const verifyExistsUserPlan = await UsersPlans.findAll({
                where: {
                    id: req.body.id
                }
            })

            if (verifyExistsUserPlan.length == 0) {
                return res.status(401).json({ message: "Não autorizado!" })
            }

            const createDepents = await Dependents.create(req.body)


        } catch (error) {

        }
    }

    async deletePlan(req,res){
        try {

            const plan = await Plans.destroy({
                where:{
                    id:req.params.id
                }
            })

            if(plan){
                return res.status(200).json({message:"Sucess"})
            }

            return res.status(404).json({message:"Nenhum plano encontrado.. :("})
            
        } catch (error) {
            
        }
    }

}

module.exports = new ControllerPlans()