const { Router } = require('express');
const { check} = require('express-validator');
const Controler=require("../controller/master.controler")
const multer = require("multer")
const upload = multer({dest:"uploads/"})
const auth = require('../middleware/auth.middleware');
const router = Router();

router.get("/:salonId",Controler.getMastersList)
router.post("/create",upload.single("avatar"),Controler.createMaster)
router.post("/update",upload.single("avatar"),Controler.updateMaster)
router.delete("delete/:masterId",Controler.deleteMaster)
module.exports=router