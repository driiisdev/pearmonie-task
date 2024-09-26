'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tokens', 'userId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'users', // Name of the Users table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tokens', 'userId');
  }
};
