class ApiError extends Error{
    constructor(
        statusCode,
        message="somethin went wrong",
        errors, stack=""
        
    ){
        super(message)// override the message 
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false
        this.errors=errors

    }
}

