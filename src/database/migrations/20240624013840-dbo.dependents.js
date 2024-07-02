'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
    await queryInterface.createTable('Dependents', { 
      
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name:{
        type: Sequelize.STRING,
      },
      
      cpf:{
        type: Sequelize.STRING,

      },

      birthday:{
        type: Sequelize.STRING,
      },
      
      phone:{
        type: Sequelize.STRING,

      },

      mail:{
        type: Sequelize.STRING,

      },

      zipCode:{
        type: Sequelize.STRING,
      },

      address:{
        type: Sequelize.STRING,
      },
      
      city:{
        type: Sequelize.STRING,
      },
      uuid:{
        type: Sequelize.STRING,

      },

      status:{
        type: Sequelize.STRING,
      },

      state:{
        type: Sequelize.STRING,
      },
      password:{
        type:Sequelize.STRING,
      },

      id_plan:{
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
