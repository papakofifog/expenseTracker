const express= require('express');
const { registerNewUser, loginUser } = require('../Controllers/applicationRequest');

const appRouter= express.Router();

appRouter.post('/registerUser', registerNewUser );
appRouter.post('/loginUser', loginUser);

module.exports={appRouter};