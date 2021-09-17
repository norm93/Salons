const User = require('../models/User');
const Salon = require('../models/Salon');
const config = require('config');
const bcrypt = require('bcryptjs');
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const { v4: uuidv4 } = require('uuid');
const MailService= require("./mail.service")
const TokenService = require("./token.service")
const AuthDto=require("../dto/auth.dto")
const jwt = require('jsonwebtoken');
const ApiError=require("../exception/api-error")
const Token = require('../models/Token');
const twilio = require('twilio');
const {uploadFile}=require("../S3")
const client = new twilio(
  config.get('accountSid'),
  config.get('authToken')
);
class AuthService {
    async FindPhone(phone){
        const user=await User.findOne({phone})
        if(!user){
            throw ApiError.undefReq("Такой пользователь не найден")
        }
        return user
    }
    async FindEmail(email){
        const user=await User.findOne({email})
        if(!user){
            throw ApiError.undefReq("Такой пользователь не найден")
        }
        return user
    }
    async registration(email, password){
        const candidate=await User.findOne({"email":email})
        if (candidate){
            throw ApiError.badRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashedPassword=await bcrypt.hash(password,12)
        const activeLink=uuidv4()
        const user =await  User.create({email,password:hashedPassword,emailLink:activeLink})
        await MailService.sendActivationMail(email,`${config.get("API_URL")}/authWeb/register/${activeLink}`)
        const authDto=new AuthDto(user)
        const tokens=await TokenService.generateToken({...authDto})
        await TokenService.saveToken(authDto.id,tokens.refreshToken)
        return {
            ...tokens,
            user:authDto
        }
    }
    async login(email,password){
        const user=await User.findOne({email})
        if(!user){
            throw ApiError.undefReq("Такой пользователь не найден")
        }
        if(user.isActivated==false){
            throw ApiError.undefReq("Подтвердите почту")
        }
        const hash=await bcrypt.compare(password,user.password)
        if(!hash){
            throw ApiError.badRequest(`Неверный пароль`)
        }
        const userDto=new AuthDto(user)
        let salon=await Salon.findOne({ownerId:userDto.id})
        if(!salon){
            salon = await Salon.create({ownerId:userDto.id})
        }
        const tokens=await TokenService.generateToken({...userDto})
        await TokenService.saveToken(userDto.id,tokens.refreshToken)
        return {
            ...tokens,
            user:userDto,
            salon
        }
}
    async loginPhone(phone){
        const Code = Math.floor(Math.random() * (999999 - 1000 + 1)) + 10000;
        const candidate=await User.findOne({phone})
        if(candidate){
            client.messages.create({
                body: `Код авторизации: ${Code}`,
                to: phone,
                from: config.get("phoneTwilio")
            });
            candidate.codePhone=Code
            await candidate.save()
            return{
                create:false
            } 
        }
        client.messages.create({
            body: `Код авторизации: ${Code}`,
            to: phone,
            from: config.get("phoneTwilio")
        });
        await  User.create({phone,codePhone:Code})    
        return{
            create:true
        }
}
    async verifyPhone(code){
        
        const candidate=await User.findOne({codePhone:code})
        if(!candidate){
            throw ApiError.badRequest(`Неверный код`)
        }
        const tokens=await TokenService.generateToken({id:candidate._id})
        await TokenService.saveToken(candidate._id,tokens.refreshToken)
        candidate.codePhone=undefined
        await candidate.save()
        return {
            ...tokens,
            user:candidate
        }
    
}
    async activateEmail(link){
        
        const user=await User.findOne({emailLink:link})
        if(!user){
            throw new Error(`Ссылка неверная`)
        }
        user.isActivated=true
        await user.save()
    
}
    async createGoogle(data){
        
        const user=await User.findOne({IdPassport:data._json.sub})
        if(user){
            return false
        }
        await User.create({IdPassport:data._json.sub,avatar:data._json.picture,name:data._json.name,verifyPhone:true})
        return true
}
    async createFacebook(data){
        
        const user=await User.findOne({IdPassport:data.id})
        if(user){
            return false
        }
        await User.create({IdPassport:data.id,name:data.displayName,verifyPhone:true})
        return true
    
}
    async forgotPassword(email){
        
        const user=await User.findOne({email})
        if(user==null){
            throw ApiError.undefReq("Такой пользователь не найден")
        }
        const Code = Math.floor(Math.random() * (999999 - 1000 + 1)) + 10000;
        const userDto=new AuthDto(user)
        await MailService.ActivationPass(email,activeLink)
        user.forgotCode=Code
        await user.save()
        return {...userDto}
    
}
    async verifyForgot(link){
        
        const user=await User.findOne({forgotCode:link})
        if(!user){
            throw ApiError.badRequest(`Не правильный код`)
        }
        user.forgotCode=undefined
        user.forgotVerify=true
        await user.save()
}
    async resetPass(email,password){
        
        const user=await User.findOne({email})
        if(!user){
            throw ApiError.badRequest(`Не правильный email`)
        }
        if(!user.forgotVerify==true){
            throw ApiError.badRequest(`Не правильный код`)
        }
        user.password=await bcrypt.hash(password,12)
        user.forgotVerify=undefined
        await user.save()
    
}
    async logout(token){
        const refresh = await TokenService.removeToken(token)
        return refresh
    }
    async updateUser(body,files){
        if(files){
        const upload=await uploadFile(files)
        body.avatar=upload.Key
        unlinkFile(files.path)
        }
        const user = await User.findByIdAndUpdate(body.id,body,{new:true})
        if(!user){
            throw ApiError.badRequest(`Не найден`)
        }
        await user.save()
        return user
    }
    async refresh(token){
        if(!token){
            throw ApiError.unAuthorizedErr()
        }
        const userData=TokenService.validateRefresh(token)
        const tokenDb=await TokenService.findToken(token)
        if(!userData || !tokenDb){
            throw ApiError.unAuthorizedErr()
        }
        const user=await User.findById(userData.id)
        const userDto=new AuthDto(user)
        const tokens=await TokenService.generateToken({...userDto})
        await TokenService.saveToken(userDto.id,tokens.refreshToken)
        return {
            ...tokens,
            user:userDto
        }
    }

}
module.exports = new AuthService();


