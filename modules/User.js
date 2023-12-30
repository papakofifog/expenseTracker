const mongose= require('mongoose');

const UserSchema= new mongose.Schema({
    firstName:{
        type: String,
        required: [true, "firstname is required"]
    },
    lastName:{
        type: String,
        required: [true, "lastname is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        validator: ['//', "Invalid email provided"]
    },
    profilePicture:{
        name:String,
        profileURL:String
    },
    username:{
        type: String,
        required: [true, "username is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    role:{
        String,
        enum:['admin','user'],
        default: ['user']
    }

});

const UserModel= mongose.model('user', UserSchema);

async function createUser(user){
    try{
        let newUser= new UserModel(
            ...user
        )
        let isCreated=await newUser.save();
        return isCreated;
    }catch(e){
        console.error(e);
    }
}

async function getOneUser(userId){
    try{
        let user= await UserModel.findOne({_id:userId});
        return user;
    }catch(e){
        console.error(e);
    }
}

async function getAllUsers(){
    try{
        let allUsers= await UserModel.find();
        return allUsers;

    }catch(e){
        console.error(e);
    }
}

async function updateUserProfile(user){
    try{
        let userIsUpdated= await UserModel.updateOne({_id:user.id}, {...user});
        return userIsUpdated;
    }catch(e){
        console.error(e);
    }
}

async function deleteUser(){
    try{
        let userIsDeleted=  await UserModel.deleteOne({_id:user.id});
        return userIsDeleted;
    }catch(e){
        console.error(e);
    }
}

module.exports={createUser,getOneUser,getAllUsers,updateUserProfile,deleteUser}