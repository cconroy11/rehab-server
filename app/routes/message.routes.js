const { authJwt } = require("../middleware");
const message = require('../controllers/message.controller.js');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new message
  app.post(
    '/api/message', 
    message.create
  );

  // Retrieve all messages
  app.get(
    '/api/messages',
    [authJwt.verifyToken, authJwt.isAdmin],
    message.findAll
  );

}