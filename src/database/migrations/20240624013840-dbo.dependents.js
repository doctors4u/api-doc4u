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
        allowNull:false,
      },
      
      cpf:{
        type: Sequelize.STRING,
        allowNull:false,

      },

      birthday:{
        type: Sequelize.STRING,
      },
      
      phone:{
        type: Sequelize.STRING,
        allowNull:false,

      },

      mail:{
        type: Sequelize.STRING,
        allowNull:false,

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
        allowNull:false

      },

      status:{
        type: Sequelize.STRING,
        allowNull:false
      },

      state:{
        type: Sequelize.STRING,
      },
      password:{
        type:Sequelize.STRING,
        allowNull:false
      },

      id_plan:{
        type:Sequelize.STRING,
        allowNull:false
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
