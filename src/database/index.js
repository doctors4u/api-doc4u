const sequelize = require("sequelize");

/* USERS */
const Users = require("../app/models/Users")

/* USERS PANEL */
const UsersPanel = require("../app/models/UsersPanel")

/* CARTS */
const Carts = require("../app/models/Carts")

/* PLANS */
const Plans = require("../app/models/Plans")


/* SERVICES */

const UsersPlans = require("../app/models/UsersPlans")
const Dependents = require("../app/models/Dependents")


/*  Connection Database  */
const connectionDatabase = require("../config/database");

const models = [
  UsersPanel,
  Users,
  Carts,
  Plans,
  UsersPlans,
  Dependents
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new sequelize(connectionDatabase);
    models.map((model) => model.init(this.connection));
  }
}

module.exports = new Database();
