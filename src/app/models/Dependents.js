const { Sequelize, Model } = require('sequelize')
const bcrypt = require("bcrypt")

class Dependents extends Model {
    static init(sequelize) {
        super.init(
            {
                name:Sequelize.STRING,  
                cpf:Sequelize.STRING,
                birthday:Sequelize.STRING,
                phone:Sequelize.STRING,
                mail:Sequelize.STRING,
                zipCode:Sequelize.STRING,
                address:Sequelize.STRING,    
                city:Sequelize.STRING,
                state:Sequelize.STRING,
                id_plan:Sequelize.STRING,
                password:Sequelize.STRING,
                password_hash:Sequelize.VIRTUAL,
                uuid:Sequelize.STRING,
                uuid_rapidoc:Sequelize.STRING,
                clientId:Sequelize.STRING,
                status:Sequelize.STRING
                    
            },
            {
                sequelize,
            }
        )

        this.addHook('beforeBulkUpdate', (options) => {
            if (options.fields.includes('id'))
                throw new Error('Requisição inválida');
        })
        this.addHook('beforeSave', async (user) => {
            if (user.password_hash) {
                user.password = await bcrypt.hash(user.password_hash, 8)
            }
        })


    }

    async checkPassword(password) {
        return bcrypt.compare(password, this.password)
    }
}

module.exports = Dependents