const db = require("../models");
const Message = db.message;

// Post a Message
exports.create = (req, res) => {  
  // Save to MySQL database
  Message.create({  
    subject: req.body.subject,
    email: req.body.email,
    message: req.body.message,
    hospital_id: req.body.hospital_id,
  }).then(hospital => {    
    // Send created Hospital to client
    res.send(hospital);
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  })
};
 
// FETCH all Messages
exports.findAll = (req, res) => {
  Message.findAll().then(messages => {
    // Send all Messages to Client
    res.send(messages);
  }).catch(err => {
    res.status(500).send("Error -> " + err);
  })
};