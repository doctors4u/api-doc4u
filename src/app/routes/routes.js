const { Router } = require("express");
const routes = Router();

const SessionRoutes = require("./Session.routes")
const panelRoutes = require("./Panel.routes")
const ClientRoutes = require("./Client.routes")
const Payments = require("./Payment.routes")


routes.use("/panel", panelRoutes);
routes.use("/client", ClientRoutes);
routes.use("/payment",Payments );
routes.use("/session", SessionRoutes);

module.exports = routes
