const jwt = require("jsonwebtoken")
const Token=require("../models/Token")
const config=require("config")
const ApiError=require("../exception/api-error")
class TokenService{
    generateToken(payload){
        const accesToken=jwt.sign(payload,config.get("jwtSecret"),{expiresIn:"30m"})
        const refreshToken=jwt.sign(payload,config.get("jwtSecretRefresh"),{expiresIn:"30d"})
        return {
            accesToken,
            refreshToken
        }
    }
    async saveToken(userId,refreshToken){
        const tokenData=await Token.findOne({user:userId})
        if(tokenData){
            tokenData.refreshToken=refreshToken
            return tokenData.save()
        }
        const token=await Token.create({user:userId,refreshToken})
        return token
    }
    async removeToken(token){
        const tokenData = await Token.deleteOne({refreshToken:token})
        return tokenData
    }
    async findToken(token){
        const tokenData = await Token.findOne({refreshToken:token})
        return tokenData
    }
    async validateAccess(token){
        try{
        const userData = jwt.verify(token,config.get("jwtSecret"))
        return userData
        }catch(e){
            return null
        }
    }
    async validateRefresh(token){
    try{
        const userData = jwt.verify(token,config.get("jwtSecretRefresh"))
        return userData
    }catch(e){
        return null
    }
    }
}
module.exports=new TokenService()