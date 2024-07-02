const { Router } = require("express");
const routes = Router();

const ControllerUsers = require("../controllers/ControllerUsers");
const ControllerPlans = require("../controllers/ControllerPlans");

routes.post("/storage", ControllerUsers.storage);
routes.get("/get/all", ControllerUsers.getAll);
routes.get("/get/dependents/:id",ControllerPlans.getDependents)
routes.put("/dependent/",ControllerPlans.updateDependent)
routes.post("/storage/rapidoc",ControllerPlans.storageRapidoc)
routes.post("/check/dependent/",ControllerPlans.getDepedent)

module.exports = routes;
