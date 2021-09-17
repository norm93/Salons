module.exports= class AuthDto{
    email;
    id;
    isActivated;
    constructor(payload){
        this.email=payload.email;
        this.id=payload._id;
        this.isActivated=payload.isActivated
    }
}