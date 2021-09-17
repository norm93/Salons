const Service = require('../models/Service');
const ApiError=require("../exception/api-error")
class ServiceService {
    async findService(salonId){
        const list=await Order.find({creator:salonId})
        .lean()
        if(list.length==0){
            throw ApiError.undefReq("Такой список не найден")
        }
        return list       
}
    async create(body){
        const service=await new Service(body)
        return service      
}
    async update(body){
        const service=await Service.findByIdAndUpdate(body._id,body,{new:true})
        if(service==null){
            throw ApiError.undefReq("Такой сервис не найден")
        }
        return service       
}
    async delete(serviceId){
    await Service.findByIdAndDelete(serviceId)
    return 
    
}
}
module.exports = new ServiceService();