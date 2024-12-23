'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Checkins', 'userId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Checkins', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    });
  }
};

