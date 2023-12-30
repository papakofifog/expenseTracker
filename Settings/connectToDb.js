const mongoose= require('mongoose');

const collectionURI= ""
const connectToDb= async ()=>{
    try{
        let connection= await mongoose.connect(collectionURI);
        return connection;
    }catch(e){
        console.error(e);
    }
}

module.exports={connectToDb};