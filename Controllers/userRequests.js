const { getOneUser } = require("../modules/User");
const { setUpResponseMessage } = require("../utility/managerUtility");

async function getActiveUserProfile(req, res, next){
    try{
        console.log(req.user)
        let activeUser= await getOneUser({_id:req.user.userId});
        if(!(activeUser)) throw new(Error("User does not exist"));
        res.locals= setUpResponseMessage("activeUser data", activeUser);
        next();
    }catch(e){
        return next(e);
    }
}

async function getAllUsers(req,res, next){
    try{
        let allUsers= await getAllUsers();
        if(!(allUsers)) throw new Error("Get all Users failed");
        res.locals= setUpResponseMessage("All users are", allUsers);
        next();
    }catch(e){
        return next(e);
    }
}

module.exports={getActiveUserProfile,getAllUsers}