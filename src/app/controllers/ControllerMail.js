const jwt = require("jsonwebtoken")
const nodeMailer = require("nodemailer")
const bcrypt = require("bcrypt")
const util = require('util');

const Users = require("../models/Users")
const Codes = require("../models/Codes")
const BlackListCodes = require("../models/BlackListCodes")
const BlackLists = require("../models/BlackLists");
const Dependents = require("../models/Dependents");

class ControllerMail {

    async resetPassword(req, res) {
        try {
            const promisify = util.promisify;

            const decode = await promisify(jwt.verify)(req.body.token, process.env.TOKEN_FORGOT_PASSWORD);
    
            const verifyToken = await BlackListCodes.findAll({
                where: {
                    token: req.body.token
                }
            });
    
            if (verifyToken.length > 0) {
                return res.status(401).json({ message: "Token já utilizado!" });
            }
    
    
            const updateUserCount = await Dependents.update({
                password: await bcrypt.hash(req.body.password_hash, 8)
            }, {
                where: {
                    mail: req.body.mail
                }
            });
    
            if (updateUserCount > 0) {


                const blackList = await BlackListCodes.create({
                    token:req.body.token,
                    mail:req.body.mail
                })

                if(blackList){
                    return res.status(200).json({ message: "Senha redefinida com sucesso!" });

                }


            } else {
                return res.status(404).json({ error: "Usuário não encontrado ou senha não atualizada!" });
            }
        } catch (error) {
            console.log(error)
            return res.status(401).json({ error: error.message });
        }
    }
    async verifyCode(req, res) {
        try {


            const user = await Dependents.findAll({
                where: {
                    mail:req.body.mail
                }
            })

            const verifyExistsCodeInBlackList = await BlackLists.findAll({
                where:{
                    code: req.body.code,
                    mail: req.body.mail
                }
            })

            if(verifyExistsCodeInBlackList.length > 0){
                return res.status(401).json({message:"Não autorizado!"})
            }

            const verifyExistsCode = await Codes.findAll({
                where: {
                    code: req.body.code,
                    mail: req.body.mail
                }
            })

            const user_id = user[0].dataValues.id

            if (verifyExistsCode.length > 0) {

                const token = jwt.sign({ user_id }, process.env.TOKEN_FORGOT_PASSWORD, {
                    expiresIn: '15m'
                })
                
                const blackList = await BlackLists.create({
                    
                    code:req.body.code,
                    mail:req.body.mail

                })

                if(blackList){
                    return res.status(200).json({ message: "Sucess", token: token })
                }

            }

            return res.status(404).json({message:"Código não encontrado !"})


        } catch (error) {
            console.log(error)
            return res.status(500)

        }
    }
    async sendCode(req, res) {

        try {

            const user = "no-reply@doc4u.com.br"
            const pass = "Xploit@@ython134"


            const transporter = nodeMailer.createTransport({

                host: "smtp.hostinger.com",
                port: 465,
                auth: { user, pass },
            })


            const existsUser = await Dependents.findOne({

                where: { mail: req.body.mail }
            })

            if (existsUser) {

                const randomCode = Math.floor(1000 + Math.random() * 9000);
                const random = randomCode.toString();

                const code = await Codes.create({
                    code: random,
                    mail:req.body.mail
                })

                transporter.sendMail({

                    from: "no-reply@doc4u.com.br",
                    to: req.body.mail,
                    subject: "Redefinição de senha",
                    html: `
                    
                    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]-->
    <!--[if !mso]><!-- -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">
    <!--<![endif]-->
</head>

<body>
    <div dir="ltr" class="es-wrapper-color">
        <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#fafafa"></v:fill>
			</v:background>
		<![endif]-->
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td class="esd-email-paddings" valign="top">
                        <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center" esd-custom-block-id="388982">
                                        <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p20" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-empty-container" style="display: none;"></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p30t es-p10b es-p20r es-p20l" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img class="adapt-img" src="https://ehvphjt.stripocdn.email/content/guids/CABINET_2c16bb26c2bcda01530334edfd5255542ee44c216dd4786475f11ed4c6fa5bd7/images/croppedlogodoc4utransparente_2.png" alt style="display: block;" height="73"></a></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text h-auto" height="55">
                                                                                        <p style="font-size: 27px; line-height: 150%;"><b></b></p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank"><img class="adapt-img" src="https://ehvphjt.stripocdn.email/content/guids/CABINET_2c16bb26c2bcda01530334edfd5255542ee44c216dd4786475f11ed4c6fa5bd7/images/forgot_passwordrafiki.png" alt style="display: block;" width="560"></a></td>
                                                                                </tr>
                                                                        
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p10t es-p10b es-p20r es-p20l" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="border-left:2px dashed #cccccc;border-right:2px dashed #cccccc;border-top:2px dashed #cccccc;border-bottom:2px dashed #cccccc;border-radius: 5px; border-collapse: separate;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p20t es-p20r es-p20l es-m-txt-c">
                                                                                        <h2>Seu código secreto!</h2>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p10t es-p20b es-p20r es-p20l es-m-txt-c" esd-links-underline="none">
                                                                                        <h1 style="color: #5c68e2; font-size: 50px;">${random}</h1>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p40t es-p30b es-p20r es-p20l" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%" style="border-width: 10px; border-style: solid; border-color: transparent; border-radius: 5px; border-collapse: separate;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-empty-container" style="display: none;"></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center" esd-custom-block-id="388980">
                                        <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="left">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p35b">
                                                                                        <p>Doc4u - Todos os direitos reservados&nbsp;<b>©</b></p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center" esd-custom-block-id="388983">
                                        <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: transparent;" bgcolor="rgba(0, 0, 0, 0)">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p20" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-empty-container" style="display: none;"></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>

                    `

                }).then((sucess) => {
                    console.log(sucess)

                }).catch((error) => {
                    console.log(error)

                })

                return res.status(200).json({ message: "Sucess" })

            } else {
                return res.status(404).json({ message: "Usuário não foi encontrado!" })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Opss... algo deu errado!" })
        }


    }



}

module.exports = new ControllerMail()