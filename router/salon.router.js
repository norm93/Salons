const { Router } = require('express');
const { check} = require('express-validator');
const auth = require('../middleware/auth.middleware');
const multer = require("multer")
const upload = multer({dest:"uploads/"})
const Controler=require("../controller/salon.controler")
const router = Router();

router.get("/",Controler.getSalonsList)
router.get("/:salonId",Controler.getOneSalon)
router.post("/create",upload.single("photo"),Controler.createSalon)
router.post("/update",upload.single("photo"),Controler.updateSalon)
router.delete("/delete/:salonId",Controler.deleteSalon)
module.exports=router