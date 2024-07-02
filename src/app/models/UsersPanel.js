const { Sequelize, Model } = require('sequelize')
const bcrypt = require("bcrypt")

class UsersPanel extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                cpf:Sequelize.STRING,
                mail:Sequelize.STRING,
                phone:Sequelize.STRING,
                permission:Sequelize.STRING,
                image:Sequelize.STRING,
                password:Sequelize.STRING,
                password_hash:Sequelize.VIRTUAL,
            },
            {
                sequelize,
            }
        )

        this.addHook('beforeSave', async (user) => {
            if (user.password_hash)
                user.password = await bcrypt.hash(user.password_hash, 8)
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

module.exports = UsersPanel