const express= require('express');
const passport= require('passport-jwt');
const { getActiveUserProfile, getAllUsers } = require('../Controllers/userRequests');
const { authenticateToken } = require('../middleware/JWT');
const UserRouter=express.Router();

UserRouter.get("/activeUser", authenticateToken, getActiveUserProfile);

module.exports={UserRouter};