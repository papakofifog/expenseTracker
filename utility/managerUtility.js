function setUpResponseMessage(message, data){
    let response={
        "message":message,
        "data": data
    }

    return response;
}

module.exports={setUpResponseMessage}