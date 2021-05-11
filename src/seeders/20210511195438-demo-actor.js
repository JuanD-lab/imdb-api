'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('actors', [{
      first_name: 'Michael',
      last_name: 'B. Jordan',
      dob: "1987-2-9",
      biography: "Michael B. Jordan, the middle of three children, was born in Santa Ana, California and raised in Newark, New Jersey. He is the son of Donna (Davis), a high school counselor, and Michael A. Jordan. His middle name, Bakari, means 'noble promise' in Swahili. (He is not related to, or named after, basketball legend Michael Jordan",
      profile_photo: "s3.amazom.com/src/img/234234mbjordan.png",
      active: true,
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('actors', null, {});
  }
};
