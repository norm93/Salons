const { findByIdAndDelete } = require('../models/Master');
const Master = require('../models/Master');
const {uploadFile}=require("../S3")
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const ApiError=require("../exception/api-error")
class MasterService {
    async createMaster(body,files){
        
            if(files){
                const upload=await uploadFile(files)
                body.avatar=upload.Key
                unlinkFile(files.path)
                }
            const salon=await new Salon(body)
            return salon
       
        }
    async updateMaster(body,files){
        
            if(files){
                const upload=await uploadFile(files)
                body.avatar=upload.Key
                unlinkFile(files.path)
                }
        const master=await Master.findByIdAndUpdate(body._id,body,{new:true})
        if(master==null){
            throw ApiError.undefReq("Не найден мастер")
        }
        return master       
       
        }
    async listMaster(salonId){
        
        const list=await Master.find({creator:salonId})
        .lean()
        if(list.length==0){
            throw ApiError.undefReq("Не найден список")
        }
        return list
       
        }
    async deleteMaster(masterId){
        
            const salon=await findByIdAndDelete(masterId)

            return salon
       
        }
}
module.exports = new MasterService();