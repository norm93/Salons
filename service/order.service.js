const Order = require('../models/Order');
const ApiError=require("../exception/api-error")
class OrderService {
    async getList(userId,limit,skip){
        const list=await Order.find({creator:userId})
        .limit(limit)
        .skip(skip)
        .lean()
        if(list.length==0){
            throw ApiError.undefReq("Не найден список ордеров")
        }
        return list
    }
    async updateList(body){
        const list=await Order.findByIdAndUpdate(body.id,body,{new:true})
        if(list==null){
            throw ApiError.undefReq("Не найден ордер")
        }
        return list
    }
    async createOrder(body){
        const list=await new Order(body)
        return list
    }
    async deleteOrder(orderId){
        const order=await Order.findByIdAndDelete(orderId)
        return order
    }
}
module.exports = new OrderService();