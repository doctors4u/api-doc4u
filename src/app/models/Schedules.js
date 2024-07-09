const { Sequelize, Model } = require('sequelize')
const bcrypt = require("bcrypt")

class Schedules extends Model {
    static init(sequelize) {
        super.init(
            {

                name:Sequelize.STRING,
                status:Sequelize.STRING,
                doctor:Sequelize.STRING, 
                specialtie:Sequelize.STRING,
                date:Sequelize.STRING,
                from:Sequelize.STRING,
                to:Sequelize.STRING,
                beneficiaryUrl:Sequelize.STRING,
                user_id:Sequelize.STRING,
                  

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

module.exports = Schedules