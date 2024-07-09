
const asaasSDK = require("asaas-sdk")
const moment = require("moment")

const Plans = require("../models/Plans")
const Users = require("../models/Users")
const Dependents = require("../models/Dependents")
const mercadopago = require("mercadopago")
const api = require("../../services/api")
const { QrCodePix } = require('qrcode-pix');
const { v4: uuidv4 } = require('uuid');

const UsersPlans = require("../models/UsersPlans")

class ControllerPayment {

    async storageAssas(req, res) {

        try {


            const verifySeviceExists = await Plans.findAll({
                where: {
                    id: req.body.id_plan
                }
            })

            if (verifySeviceExists.length > 0) {


                /* CREATE PAYMENT */
                asaasSDK.config({ environment: asaasSDK.SANDBOX, apiKey: process.env.API_SANDBOX });

                let cliente = {
                    "name": req.body.name,
                    "email": req.body.email,
                    "cpfCnpj": req.body.cpfCnpj,
                    "postalCode": req.body.zipCode,
                    "address": req.body.address,
                    "addressNumber": req.body.addressNumber,
                    "complement": req.body.complement,
                    "notificationDisabled": false,
                };

                const findalDate = moment().format("DD/MM/YYYY");

                console.log(findalDate.split('/').reverse().join('-'))


                asaasSDK.customers.post(cliente).then((client) => {
                    let payment = {
                        "customer": client.data.id,
                        "billingType": req.body.type == 1 ? "PIX" : "BOLETO",
                        "dueDate": `${findalDate.split('/').reverse().join('-')}`,
                        "installmentValue": verifySeviceExists[0].dataValues.price,
                        "installmentCount": 1,
                        "externalReference": "",
                        "postalService": false
                    }


                    asaasSDK.payments.post(payment).then(async (data) => {


                        /* LOGICA PARA INSERIR  */

                        if (data) {
                            return res.status(200).json({ message: "Pagamento criado com sucesso!", url: data.data.invoiceUrl })
                        }

                    }).catch((err) => {
                        return res.status(500).json({ message: "Opss... algo deu errado!", data: err })
                    })

                })


            }



        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Opss... algo deu errado!" })
        }

    }
    async getAssas(req, res) {

        try {

            const { id } = req.body.payment





        } catch (error) {

            return res.status(500).json({ message: "Opss.. algo deu errado!" })

        }

    }
    async storageMercadoPago(req, res) {

        try {

            const usersPlans = await req.body.dependents
            

            const verifyPlanExists = await Plans.findAll({
                where: {
                    id: usersPlans.map(item => item.id_plan)
                }
            })
   
            if (verifyPlanExists.length == 0) {
                return res.status(404).json({ message: "Plano não existe" })
            }

            const verifyUserExists = await Users.findAll({
                where: {
                    mail: usersPlans.map(item => item.email)
                }
            })



            if (verifyUserExists.length > 0) {
                return res.status(401).json({ message: "Usuário já existente!" })
            }



            const cardToken = await api.post("card_tokens", {

                "card_number": req.body.card_number.trim(),
                "expiration_month": req.body.expiration_month,
                "expiration_year": req.body.expiration_year,
                "security_code": req.body.security_code,
                "cardholder": {
                    "name": req.body.cardholder,
                    "identification": {
                        "number": String(req.body.cpfPayment).replace(".", "").replace(".", "").replace("-", ""),
                        "type": "CPF"
                    }
                },



            })

            console.log(String(req.body.cpfPayment).replace(".", "").replace(".", "").replace("-", ""))

            const pricePlan = Number(verifyPlanExists[0].dataValues.price)

            if (cardToken.status != 201) {
                return res.status(401).json({ message: "Não autorizado" })
            }


            if (cardToken.status == 201) {

                const { id } = cardToken.data



                const payment = await api.post("payments",

                    {
                        "transaction_amount": pricePlan,
                        "token": id,
                        "description": "Pagamento",
                        "installments": req.body.installments,
                        "payment_method_id": "master",
                        "payer": {

                            "email": "codergustavo@gmail.com"

                        },
                    }

                )

                if (payment.status != 201) {
                    console.log(payment.data.error)
                    return res.status(401).json({ message: "Não autorizado" })
                }


                if (payment.status == 201) {

                    const uuid = uuidv4()
                    const idPlan = await verifyPlanExists[0].dataValues.id


                    const usersPlans = await req.body.dependents

                    const promisse = await Promise.all(usersPlans.map(async item => {
                        const dependent = await Dependents.create({

                            name: item.nome || item.name,
                            cpf: String(item.cpf).replace(".", "").replace(".", "").replace("-", ""),
                            phone: item.telefone || item.phone,
                            mail: item.email || item.mail,
                            password_hash:item.password_hash,
                            id_plan: idPlan,
                            uuid:uuid,
                            

                        })

                        return dependent

                    })
                    )

                    return res.status(200).json({ message: "Sucess",uuid:uuid })
                }


            }




        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Opss... algo deu errado!" })
        }

    }

    async storagePix(req, res) {
        try {

            const qrCodePix = QrCodePix({
                version: '01',
                key: 'test@mail.com.br', //or any PIX key
                name: 'Fulano de Tal',
                city: 'SAO PAULO',
                transactionId: 'YOUR_TRANSACTION_ID', //max 25 characters
                message: 'Pay me :)',
                cep: '99999999',
                value: 150.99,
            });
            const qrCode = await qrCodePix.base64() // '00020101021126510014BR.GOV.BCB.PIX...'

            return res.status(200).json({ image: qrCode })


        } catch (error) {

            return res.status(500).json({ message: "Opss.. algo deu errado!" })

        }
    }


}

module.exports = new ControllerPayment()