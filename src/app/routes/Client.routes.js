const { Router } = require("express");
const routes = Router();

const auth = require("../middlewares/auth")

const ControllerUsers = require("../controllers/ControllerUsers");
const ControllerPlans = require("../controllers/ControllerPlans");
const ControllerMail = require("../controllers/ControllerMail");

routes.post("/storage", ControllerUsers.storage);
routes.get("/get/all", ControllerUsers.getAll);
routes.get("/get/dependents/:id",ControllerPlans.getDependents)
routes.post("/storage/schedule",auth,ControllerPlans.storageScheduleRapidoc)
routes.put("/dependent/",ControllerPlans.updateDependent)
routes.post("/schedules/by/specialty",ControllerPlans.getScheduleHoursRapiDoc)
routes.post("/storage/rapidoc",ControllerPlans.storageRapidoc)
routes.post("/check/dependent/",ControllerPlans.getDepedent)
routes.post("/send/code",ControllerMail.sendCode)
routes.post("/code/verify",ControllerMail.verifyCode)
routes.post("/reset/password",ControllerMail.resetPassword)

module.exports = routes;
