module.exports = (sequelize, Sequelize) => {
  const Hospital = sequelize.define('hospital', {
    name: {
      type: Sequelize.STRING
    },
    phone_number: {
      type: Sequelize.BIGINT
    },
    address: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    zip: {
      type: Sequelize.BIGINT
    },
  });
  
  return Hospital;
}