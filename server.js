const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//ENV
const dotenv = require("dotenv");
dotenv.config();

const app = express();

//Serve files on AWS
if (process.env.NODE_ENV == "production" ) {
  app.use(express.static('../rehab-challenge/dist'));
}

var corsOptions = {
  origin: process.env.SITE_URL 
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
require('./app/routes/message.routes')(app);

// set port, listen for requests
app.listen(process.env.PORT , () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
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