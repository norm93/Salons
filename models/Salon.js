const { Schema, model } = require('mongoose');
const SalonSchema = new Schema({
    shortId:{type:String},
    name:{type:String,default:""},
    photo:{type:String},
    ownerId:{type:String},
    description:{type:String,default:""}

})
module.exports = model('Salon', SalonSchema);
