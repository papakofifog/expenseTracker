require('dotenv').config();
const jwt= require('jsonwebtoken');
const passport= require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const extractJWT= require('passport-jwt').ExtractJwt;



async function authenticateToken(req, res, res){
    
    const opts = {
        jwtFromRequest : await extractJWT.fromAuthHeaderAsBearerToken(),
        secreteOrKey : process.env.JWTSECRET,
    }
    console.log(opts)
    passport.use(new JwtStrategy(opts, function (jwt_payload, done){
        req.user=jwt_payload;
        console.log(jwt_payload)
        done()
    }))
    
}







async function createToken(userData){
    try{
        let token= await jwt.sign(
            {
            sub:userData
            },
            process.env.JWTSECRET,
            {expiresIn: '1h'}
        );
        return token;
    }catch(e){
        console.error(e);
    }
}

module.exports={createToken, authenticateToken}

