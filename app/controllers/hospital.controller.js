const db = require("../models");
const Hospital = db.hospitals;

// Post a Hospital
exports.create = (req, res) => {  
  // Save to MySQL database
  Hospital.create({  
    name: req.body.name,
    phone_number: req.body.phone_number,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
  }).then(hospital => {    
    // Send created Hospital to client
    res.send(hospital);
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  })
};
 
// FETCH all Hospitals
exports.findAll = (req, res) => {
  Hospital.findAll().then(hospitals => {
    // Send all Hospitals to Client
    res.send(hospitals);
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  })
};
 
// Find a Hospital by Id
exports.findById = (req, res) => {  
  Hospital.findById(req.params.hospitalId).then(hospital => {
    res.send(hospital);
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  })
};
 
// Update a Hospital
exports.update = (req, res) => {
  var hospital = req.body;
  const id = req.params.hospitalId;
  Hospital.update( { name: req.body.name, phone_number: req.body.phone_number, address: req.body.address, city: req.body.city, state: req.body.state, zip: req.body.zip }, 
    { where: {id: req.params.hospitalId} }
    ).then(() => {
      res.status(200).send(hospital);
    }).catch(err => {
      res.status(500).send("Error -> " + err);
  })
};
 
// Delete a Hospital by Id
exports.delete = (req, res) => {
  const id = req.params.hospitalId;
  Hospital.destroy({
    where: { id: id }
  }).then(() => {
    res.status(200).send('Hospital has been deleted!');
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  });
};