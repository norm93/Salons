const { Router } = require('express');
const router = Router();
const {getFileStream}=require("../S3")
router.get("/:key",(req,res)=>{
    const key=req.params.key
    const readStream=getFileStream(key)

    readStream.pipe(res)
})

module.exports=router