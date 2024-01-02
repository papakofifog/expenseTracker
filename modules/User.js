const mongose= require('mongoose');

const UserSchema= new mongose.Schema({
    
    firstName:{
        type: String,
        required: [true, "firstname is required"],
        trim: true
    },
    lastName:{
        type: String,
        required: [true, "lastname is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already exists"],
        validate: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email provided"],
        trim: true
    },
    profilePicture:{
        name:String,
        profileURL:String
    },
    username:{
        type: String,
        required: [true, "username is required"],
        unique: [true, "username already exists"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    role:{
        type:String,
        enum:['ADMIN','USER'],
        default: ['USER']
    }

});

const UserModel= mongose.model('user', UserSchema);

async function createUser(user,next){
    try{
        let newUser= new UserModel(
            {
                ...user
            }  
        )
        let isCreated=await newUser.save();
        return isCreated;
    }catch(e){
        next(e);
    }
}

async function getOneUser(userData){
    try{
        let user= await UserModel.findOne({...userData}).select("firstname,lastname,username,email");
        return user;
    }catch(e){
        next(e);
    }
}

async function getAllUsers(){
    try{
        let allUsers= await UserModel.find().select("firstname,lastname,username,email");
        return allUsers;

    }catch(e){
        next(e);
    }
}

async function updateUserProfile(user){
    try{
        let userIsUpdated= await UserModel.updateOne({_id:user.id}, {...user});
        return userIsUpdated;
    }catch(e){
        next(e);
    }
}

async function deleteUser(){
    try{
        let userIsDeleted=  await UserModel.deleteOne({_id:user.id});
        return userIsDeleted;
    }catch(e){
        next(e);
    }
}

module.exports={createUser,getOneUser,getAllUsers,updateUserProfile,deleteUser}