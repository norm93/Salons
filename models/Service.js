const { Schema, model } = require('mongoose');
const ServiceSchema = new Schema({
    shortId:{type:String},
    name:{type:String},
    price:{type:Number},
    creator:{type:String},

})
module.exports = model('Service', ServiceSchema);
