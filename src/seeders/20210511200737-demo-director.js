'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('directors', [{
      first_name: 'Robert',
      last_name: 'Zemeckis',
      dob: "1951-5-14",
      biography: "A whiz-kid with special effects, Robert is from the Spielberg camp of film-making (Steven Spielberg produced many of his films). Usually working with writing partner Bob Gale, Robert's earlier films show he has a talent for zany comedy (Dos bribones tras la esmeralda perdida (1984), 1941 (1979)) and special effect vehicles (¿Quién engañó a Roger Rabbit? (1988) and Volver al futuro (1985)).",
      profile_photo: "s3.amazom.com/src/img/234234robert.png",
      active: true,
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('directors', null, {});
  }
};
