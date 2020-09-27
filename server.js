const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const bcrypt = require("bcryptjs");
const Role = db.role;
const User = db.user;
const UserRole = db.userRole;
const Hospital = db.hospitals;


db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

// Routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/hospital.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {  
  Role.create({
    id: 1,
    name: "admin"
  });

  User.create({
    username: "admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("admin", 8)
  });

  UserRole.create({
    roleId: 1,
    userId: 1,
  });

  Hospital.create({
    name: "Hospital",
    phone_number: "4075555555",
    address: "123 Cherry Ln",
    city: "Orlando",
    state: "FL",
    zip: 32836,
  });
}