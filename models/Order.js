const { Schema, model } = require('mongoose');
const OrderSchema = new Schema({
    shortId:{type:String},
    clientId:{type:String},
    clientName:{type:String},
    salonId:{type:String},
    salonName:{type:String},
    masterId:{type:String},
    masterName:{type:String},
    masterAvatar:{type:String},
    serviceId:{type:String},
    serviceName:{type:String},
    date:{type:Date},
    creator:{type:String},
    price:{type:Number},
});

module.exports = model('Order', OrderSchema);
