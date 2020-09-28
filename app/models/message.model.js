module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define('message', {
    subject: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    message: {
      type: Sequelize.TEXT
    },
    hospital_id: {
      type: Sequelize.INTEGER
    },
  });
  
  return Message;
}