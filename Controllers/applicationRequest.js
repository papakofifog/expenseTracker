const {createUser,getOneUser,getAllUsers,updateUserProfile,deleteUser}= require('../modules/User');
const {encryptPassword, verifyPassword}= require('../middleware/hashPassword');
const {createToken} = require('../middleware/JWT');
const {setUpResponseMessage}= require('../utility/managerUtility')

async function registerNewUser(req, res, next){
    try{
       // encrypt the user password
       req.body.password= await encryptPassword(req.body.password);
       
       //create new User
       await createUser(req.body, next);
       res.locals=setUpResponseMessage("User Registered!");
       return next();
    }catch(e){
        next(e);
    }
}

async function loginUser(req, res,next){
    try{
        //validate user input.
        //find User and verify password.
        let existingUser= await getOneUser({email:req.body.email});
        if(!(existingUser)) throw new Error("Invalid credentials");
        let isPasswordVerified= await verifyPassword(req.body.password,existingUser.password);
        if(!(isPasswordVerified)) throw new Error("Invalid credentials");
        let userToken= await createToken({
            userId:existingUser._id,
            role: existingUser.role
        });
        res.locals=setUpResponseMessage("Login Success",userToken)
        return next()
    }catch(e){
        return next(e);
    }
}
module.exports={registerNewUser, loginUser}