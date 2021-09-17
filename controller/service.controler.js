const Service=require("../service/service.service")
class ServiceControler {
    async getServicesList(req,res,next){
        try{
        const listService=await Service.findService(req.params.salonId)
        res.status(200).json({message:"Найден",data:listService})
        return listService
        }catch(e){
          next(e)
        }
    }
    async createService(req,res,next){
        try{
        const service=await Service.create(req.body)
        res.status(200).json({message:"Успешно создан"})
        return service
        }catch(e){
          next(e)
        }
    }
    async updateService(req,res,next){
        try{
            const service=await Service.update(req.body)
            res.status(200).json({message:"Успешно создан"})
            return service    
        }catch(e){
          next(e)
        }
    }
    async removeService(req,res,next){
        try{
        await Service.delete(req.params.serviceId)
        return res.status(200).json({message:"Успешно удаленно"})
        }catch(e){
          next(e)
        }
    }
}
module.exports = new ServiceControler();