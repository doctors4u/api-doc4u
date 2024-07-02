const { Router } = require("express");
const routes = Router();

const ContollerSession = require("../controllers/ContollerSession");

routes.post("/storage/panel", ContollerSession.storagePanel);
routes.post("/storage/app", ContollerSession.storageApp);


module.exports = routes;
