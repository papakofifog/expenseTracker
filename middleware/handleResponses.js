function success(req, res, next){
    
    let response= {
        "message":res?.locals?.message,
        "data":res?.locals?.data || undefined
    }

    return res.status(200).json(response);
}

module.exports={success}