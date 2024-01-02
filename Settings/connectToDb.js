const mongoose= require('mongoose');

const collectionURI= "mongodb://localhost:27017/expenseTracker";
const connectToDb= async ()=>{
    try{
        let connection= await mongoose.connect(collectionURI);
        if(connection) console.log("Connected to the DB");
        return connection;
    }catch(e){
        console.error(e);
    }
}

module.exports={connectToDb};