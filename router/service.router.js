const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const Controler=require("../controller/service.controler")
const router = Router();

router.get("/:salonId",Controler.getServicesList)
router.post("/create",Controler.createService)
router.post("/update",Controler.updateService)
router.delete("delete/:salonId",Controler.removeService)
module.exports=router