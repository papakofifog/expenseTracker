function handleValidationErrors(err){
    let pendingErrors= err.errors;
    let errors=[];
    for(let fieldName in pendingErrors){
        if(pendingErrors.hasOwnProperty(fieldName)){
            const fieldError = pendingErrors[fieldName];
            errors.push({
                "message":fieldError.properties.message,
                //"Path": fieldError.properties.path
            });
        }
    }
    return errors;
}

function handleDuplicationValidation(errorCode,keyValue){
    let message='';
    let errors=[];
    switch(errorCode){
        case 11000:
            message= `${Object.keys(keyValue)[0]} already taken`

    }

    errors.push({"message":message})
    return errors;

}

function handleGeneralErrors(err){
    let errorMessage= err?.message;
    let errors=[];
    errors.push({
        "message":errorMessage
    })
    return errors;
}





function handleErrors(err,req,res,next){

    let errorName= err.name;
    let errors=[];
    
    switch(errorName){
        case "ValidationError":
            errors=handleValidationErrors(err);
            break;
        case "MongoServerError":
            errors=handleDuplicationValidation(err.code, err.keyValue)
            break;
        case "Error"   :
            errors=handleGeneralErrors(err);
            break;       
    }
   return res.status(400).send({
    "data": {
        errors
    }

   })
};



module.exports={handleErrors}