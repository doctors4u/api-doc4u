const { Sequelize, Model } = require('sequelize')
const bcrypt = require("bcrypt")

class UsersPlans extends Model {
    static init(sequelize) {
        super.init(
            {
                status: Sequelize.STRING,
                cpf:Sequelize.STRING,
                user_id:Sequelize.STRING,
                id_plan:Sequelize.STRING,
            },
            {
                sequelize,
            }
        )

        this.addHook('beforeBulkUpdate', (options) => {
            if (options.fields.includes('id'))
                throw new Error('Requisição inválida');
        })
    }

}

module.exports = UsersPlans