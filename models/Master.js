const { Schema, model } = require('mongoose');
const MasterSchema = new Schema({
    shortId:{type:String},
    name:{type:String},
    avatar:{type:String},
    position:{type:String},
    workedInSalons:[{type:String}],
    providedServices:[{
        id:{type:String},
        name:{type:String}
    }],
    creator:{type:String},
    status:{type:String}

})
module.exports = model('Master', MasterSchema);
