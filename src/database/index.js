const sequelize = require("sequelize");

/* USERS */
const Users = require("../app/models/Users")

/* USERS PANEL */
const UsersPanels = require("../app/models/UsersPanels")

/* CARTS */
const Carts = require("../app/models/Carts")

/* PLANS */
const Plans = require("../app/models/Plans")


/* SERVICES */

const UsersPlans = require("../app/models/UsersPlans")
const Dependents = require("../app/models/Dependents")
const Schedules = require("../app/models/Schedules")
const Codes = require("../app/models/Codes")
const BlackListCodes = require("../app/models/BlackListCodes")
const BlackLists = require("../app/models/BlackLists")

/*  Connection Database  */
const connectionDatabase = require("../config/database");

const models = [
  UsersPanels,
  Users,
  Carts,
  Plans,
  UsersPlans,
  Dependents,
  Schedules,
  Codes,
  BlackLists,
  BlackListCodes
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
