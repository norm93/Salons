const Service=require("../service/master.service")
class MasterControler {
    async getMastersList(req,res,next){
        try{
        const listMaster=await Service.listMaster(req.params.salonId)
        res.status(200).json({message:"Успешно",data:listMaster})
        return listMaster
        }catch(e){
           next(e)
          }
    }
    async createMaster(req,res,next){
        try{
        const master=await Service.createMaster(req.body,req.file)
        res.status(200).json({message:"Успешно создан"})
        return master
        }catch(e){
           next(e)
          }
    }
    async updateMaster(req,res,next){
        try{
        const master=await Service.updateMaster(req.body,req.file)
        res.status(200).json({message:"Успешно обновленно",data:master})
        return master
        }catch(e){
           next(e)
          }
    }
    async deleteMaster(req,res,next){
        try{
        const master=await Service.deleteMaster(req.params.masterId)
        res.status(200).json({message:"Успешно удаленно"})
        return master
        }catch(e){
           next(e)
          }
    }
}
module.exports = new MasterControler();