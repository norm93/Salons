const Salon = require('../models/Salon');
const ApiError=require("../exception/api-error")
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const {uploadFile}=require("../S3")
class SalonService {
    async createSalon(body,files){
            if(files){
                const upload=await uploadFile(files)
                body.photo=upload.Key
                unlinkFile(files.path)
                }
            const salon=await new Salon(body)
            return salon
        }
    async updateSalon(body,files){
            if(files){
                const upload=await uploadFile(files)
                body.photo=upload.Key
                unlinkFile(files.path)
                }
            const salon=await Salon.findByIdAndUpdate(body.id,body,{new:true})
            if(salon==null){
                throw ApiError.undefReq("Не найден салон")
            }
            return salon
        
        }
    async listSalon(){
            const salon=await Salon.find()
            if(salon.length==0){
                return []
            }
            return salon
        
        }
    async SalonOne(salonId){
        
            const salon=await Salon.findById(salonId)
            if(salon==null){
                throw ApiError.undefReq("Не найден салон")
            }
            return salon
        
        }
    async SalonDelete(salonId){
        
            const salon=await Salon.findByIdAndDelete(salonId)
            return salon
        
        }
}
module.exports = new SalonService();