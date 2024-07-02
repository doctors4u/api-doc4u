const { Router } = require("express");
const routes = Router();
const auth = require("../middlewares/auth")
const ControllerPayment = require("../controllers/ControllerPayment");

routes.post("/storage/assas/pix",ControllerPayment.storageAssas);
routes.post("/storage/mercadolivre",ControllerPayment.storageMercadoPago);

routes.post("/storage/assas", ControllerPayment.storageAssas);
routes.post("/storage/pix", ControllerPayment.storagePix);


module.exports = routes;
