const { Schema, model } = require('mongoose');
const UserSchema = new Schema({
    IdPassport:{type:String},
    name:{type:String},
    avatar:{type:String},
    isAdmin:{type:Boolean},
    phone:{type:String},
    email:{type:String},
    password:{type:String},
    codePhone:{type:Number},
    isActivated:{type:Boolean,default:false},
    forgotCode:{type:String},
    forgotVerify:{type:Boolean},
    emailLink:{type:String},
})
module.exports = model('User', UserSchema);
