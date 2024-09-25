'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add the createdAt column
    await queryInterface.addColumn('roles', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });

    // Add the updatedAt column
    await queryInterface.addColumn('roles', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove the createdAt column
    await queryInterface.removeColumn('roles', 'createdAt');
    
    // Remove the updatedAt column
    await queryInterface.removeColumn('roles', 'updatedAt');
  }
};
