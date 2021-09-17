const S3=require("aws-sdk/clients/s3")
const config=require("config")
const fs=require("fs")
const s3=new S3({
    region:config.get("AWS_REGION"),
    accessKeyId:config.get("AWS_ACCESS"),
    secretAccessKey:config.get("AWS_SECRET")
})

function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
      Bucket:config.get("AWS_NAME"),
      Body: fileStream,
      Key: file.filename
    }
  
    return s3.upload(uploadParams).promise()
  }
  exports.uploadFile = uploadFile
  
  
  function getFileStream(fileKey) {
    const downloadParams = {
      Key: fileKey,
      Bucket:config.get("AWS_NAME")
    }
  
    return s3.getObject(downloadParams).createReadStream()
  }
  exports.getFileStream = getFileStream