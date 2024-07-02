const { Sequelize, Model } = require('sequelize')
const bcrypt = require("bcrypt")

class Services extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                image:Sequelize.STRING,                
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

module.exports = Services