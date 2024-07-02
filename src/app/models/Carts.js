const { Sequelize, Model } = require('sequelize')
const bcrypt = require("bcrypt")

class Carts extends Model {
    static init(sequelize) {
        super.init(
            {
                user_id: Sequelize.STRING,
                total:Sequelize.STRING,
                provider_id:Sequelize.STRING,
                service_id:Sequelize.STRING
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

module.exports = Carts