'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('user', [
      {
        email: 'John Doe',
        password: '123',
        username: 'quel1',
        address: 'ca mau',
        sex: 'nam',
        phone: '0832575905',
        groupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),

      }, {
        email: 'david',
        password: '1233423',
        username: 'quel2',
        address: 'ca mau',
        sex: 'nam',
        phone: '0832575905',
        groupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        email: 'jodan',
        password: '1234235',
        username: 'quel3',
        address: 'ca mau',
        sex: 'nam',
        phone: '0832575905',
        groupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
