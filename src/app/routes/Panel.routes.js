const { Router } = require("express");
const routes = Router();

const auth = require("../middlewares/authpanel")
const ControllerPlans = require("../controllers/ControllerPlans");

const ControllerPanel = require("../controllers/ControllerPanel");

//  routes.use(auth)


routes.post("/plan/storage",ControllerPlans.storage)
routes.get("/plans",ControllerPlans.getAll)
routes.post("/storage",ControllerPanel.storage)

routes.post("/service/storage", ControllerPlans.storage);
routes.post("/plan/storage", ControllerPlans.storage);
routes.get("/get/client/by/id/:id",ControllerPanel.getUserById)
routes.get("/get/all", ControllerPanel.getUsers);
routes.get("/get/all/dependents", ControllerPanel.getAllDependents);
routes.delete("/plan/:id", ControllerPlans.deletePlan);

module.exports = routes;
