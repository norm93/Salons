// const shortid = require('shortid');
const config = require('config');
const sharp = require('sharp');
const Service=require("../service/auth.service")
class AuthControler {
      async registerEmail(req,res,next){
        try{
          const {email,password}=req.body;
          const userData = await Service.registration(email,password)
          res.cookie("refreshToken",userData.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
          return res.json(userData)
        }catch(e){
          next(e)
        }

      }
      async VerifyEmail(req,res,next){
        try{
          const link=req.params.link
          await Service.activateEmail(link)
          return res.redirect(config.get("FRONT_URL"))
        }catch(e){
          next(e)
        }

      }
      async logout(req,res,next){
        try{
          const {refreshToken}=req.cookies
          if(!refreshToken){
          req.logout()
          return res.status(200)
          }
          const token =await Service.logout(refreshToken)
          res.clearCookie("refreshToken")
          return res.status(200).json(token)
        }catch(e){
          next(e)
        }

      }
      async refresh(req,res,next){
        try{
          const {refreshToken}=req.cookies
          const userData=await Service.refresh(refreshToken)
          res.cookie("refreshToken",userData.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
          return res.json(userData)
        }catch(e){
          next(e)
        }

      }
      async loginWeb(req,res,next){
        try{
          const {email,password}=req.body
          const userData=await Service.login(email,password)
          res.cookie("refreshToken",userData.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
          return res.json(userData)
        }catch(e){
          next(e)
        }

      }
      async forgot(req,res,next){
        try{
          const email=req.body.email
          const send=await Service.forgotPassword(email)
          return res.status(200).json({message:"Код отправлен",send})
        }catch(e){
          next(e)
        }

      }
      async createGoogle(req,res,next){
        try{
          if(!req.user){
           return next(e).json({ message:"Не коректные данные"});
          }
         const user= await Service.createGoogle(req.user)
          return res.status(200).json({creator:user})
        }catch(e){
          next(e)
        }
      
      }
      async createFacebook(req,res,next){
        try{
          if(!req.user){
           return next(e).json({ message:"Не коректные данные"});
          }
         const user= await Service.createFacebook(req.user)
          return res.status(200).json({creator:user})
        }catch(e){
          next(e)
        }
      
      }
      async verifyPhone(req,res,next){
        try{
         const userData=await Service.verifyPhone(req.body.code)
          return res.status(200).json(userData)
        }catch(e){
          next(e)
        }
      
      }
      async login(req,res,next){
        try{
         const user=await Service.loginPhone(req.body.phone)
          return res.status(200).json({message:"Успешно отправлен код",create:user.create})
        }catch(e){
          next(e)
        }
      
      }
      async update(req,res,next){
        try{
            const user=await Service.updateUser(req.body,req.file)
        return res.status(200).json({message:"Успешно",data:user})
        }catch(e){
            return next(e)
        }
    }
      async verifyForgot(req,res,next){
        try{
          const link=req.body.code
          await Service.verifyForgot(link)
          return res.status(200).json({message:"Успешно,введите новый пароль"})
        }catch(e){
          next(e)
        }
      }
      async resetPassword(req,res,next){
        try{
          const {email,password}=req.body
          await Service.resetPass(email,password)
          return res.status(200).json({message:"Пароль изменен"})
        }catch(e){
          next(e)
        }

      }
}
module.exports = new AuthControler();