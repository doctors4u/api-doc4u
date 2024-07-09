const { Sequelize, Model } = require('sequelize')
const bcrypt = require("bcrypt")

class Codes extends Model {
    static init(sequelize) {
        super.init(
            {
                mail: Sequelize.STRING,
                code:Sequelize.STRING,
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

module.exports = Codes