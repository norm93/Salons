const { Router } = require('express');
const config= require('config');
const Controler=require("../controller/auth.controler")
const TokenMiddleware = require('../middleware/auth.middleware');
const auth = require("../passport-setup")
const multer = require("multer")
const upload = multer({dest:"uploads/"})
const { check} = require('express-validator');
const passport = require("passport")
const router = Router();

router.post("/login",Controler.login)
router.post("/update",upload.single("avatar"),Controler.update) 
router.post("/loginVerify",Controler.verifyPhone)

router.get("/facebook",
passport.authenticate('facebook'))

router.get("/facebook/callback",
passport.authenticate('facebook', 
{ successRedirect:`${config.get("API_URL")}/auth/facebook/create`,
failureRedirect: `${config.get("FRONT_URL")}/login` }));

router.get("/google/create" ,Controler.createGoogle)
router.get("/facebook/create" ,Controler.createFacebook)
router.get('/google',
passport.authenticate('google', 
{ scope: ['profile','email'] }));

router.get('/google/callback', 
passport.authenticate('google', 
{ successRedirect:`${config.get("API_URL")}/auth/google/create`,
failureRedirect: `${config.get("FRONT_URL")}/login` }));
module.exports=router