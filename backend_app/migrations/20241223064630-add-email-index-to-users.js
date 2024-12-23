'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('Users', ['email']);  // Adding index on the 'email' column
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('Users', ['email']); // Remove index on 'email' if we rollback
  }
};


