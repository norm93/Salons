const nodemailer=require("nodemailer")
const config=require("config")
const ApiError=require("../exception/api-error")
class MailService{
    constructor(){
        this.transporter = nodemailer.createTransport({
            host:config.get("SMTP_HOST"),
            port:config.get("SMTP_PORT"),
            secure:false,
            auth:{
                user:config.get("SMTP_USER"),
                pass:config.get("SMTP_PASSWORD")
            }
        })
    }
    async sendActivationMail(to,link){
        await this.transporter.sendMail({
            from:config.get("SMTP_USER"),
            to,
            subject:`Активация аккаунта на ${config.get("API_URL")}`,
            text:"",
            html:
            `
            <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href ="${link}">${link}</a>`
        })
    }
    async ActivationPass(to,link){
        await this.transporter.sendMail({
            from:config.get("SMTP_USER"),
            to,
            subject:`Востановления пароля на ${config.get("API_URL")}`,
            text:"",
            html:
            `
            <div>
            <h1>Для сброса пароля введите код: ${link}</h1>
            `
        })
    }
}

module.exports=new MailService()