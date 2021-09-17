const Service=require("../service/order.service")
class OrderControler {
    async getUserOrdersList(req,res,next){
    try{
        const page = req.query.page || 1;
        const size = req.query.size || 6;
        const limit = parseInt(size);
        const skip = (page - 1) * size;
        const list = await Service.getList(req.params.userId, limit, skip);
        return res.status(200).json({message:"Успешно",data:list})
    }catch(e){
        next(e)
    }
    }
    async updateOrder(req,res,next){
        try{
            const orders=await Service.updateList(req.body)
        return res.status(200).json({message:"Успешно",data:orders})
        }catch(e){
            next(e)
        }
    }
    async createOrder(req,res,next){
        try{
        const order=await Service.createOrder(req.body)
        res.status(200).json({message:"Успешно создан"})
        return order
        }catch(e){
            next(e)
        }
    }
    async deleteOrder(req,res,next){
        try{
        await Service.deleteOrder(req.params.orderId)
        return res.status(200).json({message:"Успешно удаленно"})
        }catch(e){
            next(e)
        }
    }
}
module.exports = new OrderControler();