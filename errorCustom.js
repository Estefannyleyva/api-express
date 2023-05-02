class StatusHttp extends Error{
    constructor(message, status){
        super(message),
        this.status = status || 480
    }
}

export {StatusHttp}