const mongoose= require('mongoose');

let CategorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Category name is required"],
    },
    percentageAlloted:{
        type:String,
        required: [true, "Percentage name is required"]
    },
    capPercentageOnExpences:{
        type:Number,
        
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'user',
        required:true
    }
}, {timestamps:true})

const CategoryModel= mongoose.model('category', CategorySchema);

module.exports= CategoryModel;