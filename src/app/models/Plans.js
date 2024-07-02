const { Sequelize, Model } = require('sequelize')
const bcrypt = require("bcrypt")

class Plans extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                psychology:Sequelize.BOOLEAN,
                nutritionist:Sequelize.BOOLEAN,
                clinical:Sequelize.BOOLEAN,
                qtd_dependents:Sequelize.STRING,
                extra_life: Sequelize.STRING,    
                price: Sequelize.STRING,
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

module.exports = Plans