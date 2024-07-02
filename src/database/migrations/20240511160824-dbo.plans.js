'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable("Plans", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      psychology: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },

      nutritionist: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },

      clinical: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },

      qtd_dependents: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      extra_life: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.STRING,
        allowNull: false,
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
