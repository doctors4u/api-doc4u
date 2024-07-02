const { Sequelize, Model } = require('sequelize')
const bcrypt = require("bcrypt")

class Users extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                image: Sequelize.STRING,
                cpf: Sequelize.STRING,
                phone:Sequelize.STRING,
                mail:Sequelize.STRING,
                password: Sequelize.STRING,
                password_hash: Sequelize.VIRTUAL
            },
            {
                sequelize,
            }
        )


        this.addHook('beforeSave', async (user) => {
            if (user.password_hash) {
                user.password = await bcrypt.hash(user.password_hash, 8)
            }
        })

        this.addHook('beforeBulkUpdate', (options) => {
            if (options.fields.includes('id'))
                throw new Error('Requisição inválida');
        })
        
    }
    async checkPassword(password) {
        return bcrypt.compare(password, this.password)
    }

}

module.exports = Users