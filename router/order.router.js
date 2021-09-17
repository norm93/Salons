const { Router } = require('express');
const { check} = require('express-validator');
const Controler=require("../controller/order.controler")
const auth = require('../middleware/auth.middleware');
const router = Router();

router.get("/:userId", Controler.getUserOrdersList)
router.post("/update", Controler.updateOrder)
router.delete("/delete/:orderId", Controler.deleteOrder)
router.post("/create", Controler.createOrder)
module.exports=router