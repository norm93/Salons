const Service=require("../service/salon.service")
class SalonControler {
    async getSalonsList(req,res,next){
    try{
        const salon=await Service.listSalon()
        res.status(200).json({data:salon})
        return salon
    }catch(e){
        next(e)
    }
    }
    async getOneSalon(req,res,next){
    try{
        const salon=await Service.SalonOne(req.params.salonId)
        res.status(200).json({data:salon})
        return salon
    }catch(e){
        next(e)
    }
    }
    async createSalon(req,res,next){
    try{
        const salon=await Service.createSalon(req.body,req.file)
        
        res.status(200).json({message:"Успешно создан"})
        return salon
    }catch(e){
        next(e)
    }
    }
    async updateSalon(req,res,next){
    try{
        const salon=await Service.updateSalon(req.body,req.file)
        res.status(200).json({message:"Успешно",data:salon})
        return salon
    }catch(e){
        next(e)
    }
    }
    async deleteSalon(req,res,next){
    try{
        await Service.SalonDelete(req.params.salonId)
        return res.status(200).json({message:"Успешно удаленно"})
    }catch(e){
        next(e)
    }
    }
}
module.exports = new SalonControler();