module.exports=class ApiError extends Error{
    status;
    constructor(status,message){
        super(message)
        this.status=status
    }
    static unAuthorizedErr(){
        return new ApiError(401,"Пользователь не авторизован")
    }
    static badRequest(message){
        return new ApiError(400,message)
    }
    static undefReq(message){
        return new ApiError(404,message)
    }
}