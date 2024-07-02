const { Router } = require("express");
const routes = Router();

const auth = require("../middlewares/authpanel")

const ControllerPanel = require("../controllers/ControllerPanel");
const ControllerPlans = require("../controllers/ControllerPlans");

// routes.use(auth)

routes.get("/plans",ControllerPlans.getAll)
routes.post("/storage",ControllerPanel.storage)

routes.post("/service/storage", ControllerPlans.storage);
routes.post("/plan/storage", ControllerPlans.storage);
routes.get("/get/client/by/id/:id",ControllerPanel.getUserById)
routes.get("/get/all", ControllerPanel.getUsers);

module.exports = routes;
