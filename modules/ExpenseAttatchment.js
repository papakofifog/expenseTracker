const mongoose= require('mongoose');

let attatchmentSchema= new mongoose.Schema({
    expense_id:{
        type: mongoose.Types.ObjectId,
        ref:'expense',
        required: [true,"expense id is required"]
    },
    file_path:{
        type:String,
        required: [true, "file URL is required"]
    },
    description:{
        type:String,
        
    }
}, {timestamps:true})

const AttatchmentModel= mongoose.model('attachement',attatchmentSchema);

module.exports=AttatchmentModel;


