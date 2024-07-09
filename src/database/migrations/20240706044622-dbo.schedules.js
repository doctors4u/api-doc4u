'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    queryInterface.createTable('Schedules', { 

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name:{
        type:Sequelize.STRING
      },
      status:{
        type:Sequelize.STRING
      },
      doctor:{
        type:Sequelize.STRING
      },
      specialtie:{
        type:Sequelize.STRING
      },
      date:{
        type:Sequelize.STRING
      },
      from:{
        type:Sequelize.STRING
      },
      to:{
        type:Sequelize.STRING
      },
      beneficiaryUrl:{
        type:Sequelize.STRING,
      },
      user_id:{
        type:Sequelize.STRING,
      },
      
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }


     });
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
