const { authJwt } = require("../middleware");
const hospitals = require('../controllers/hospital.controller.js');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Hospital
  app.post(
    '/api/hospital', 
    [authJwt.verifyToken, authJwt.isAdmin],
    hospitals.create
  );

  // Retrieve all Hospitals
  app.get(
    '/api/hospitals',
    hospitals.findAll
  );

  // Update a Hospital with Id
  app.put(
    '/api/hospital/:hospitalId', 
    [authJwt.verifyToken, authJwt.isAdmin],
    hospitals.update
  );

  // Delete a Hospital with Id
  app.delete(  
    '/api/hospital/:hospitalId', 
    [authJwt.verifyToken, authJwt.isAdmin],
    hospitals.delete
  );
}