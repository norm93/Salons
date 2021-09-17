const { Router } = require('express');
const Controler=require("../controller/auth.controler")
const auth = require('../middleware/auth.middleware');
const { check} = require('express-validator');
const router = Router();

router.post("/register",Controler.registerEmail)
router.get("/register/:link",Controler.VerifyEmail)
router.post("/login",Controler.loginWeb)
router.post("/refresh",Controler.refresh)
router.post("/forgot",Controler.forgot)
router.get("/forgot/",Controler.verifyForgot)
router.post("/reset",Controler.resetPassword)
module.exports=router