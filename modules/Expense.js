const mongoose= require('mongoose');


const expenseSchema= new mongoose.Schema({
    title: {type: String, required:true},
    expenseAmount: {
        type: Number,
        get : v => (v/100).toFixed(2),
        set: v=> v*100
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
    },
    budgetId:{
        type:mongoose.Types.ObjectId,
        ref:'budget',
        required:true
    },
    expense_category_id:{
        type:mongoose.Types.ObjectId,
        ref:'category',
        required:true
    },
    paymentMethod:{
        type:String,
        default:"Cash"
    },
    location:{
        type:String,
    },
    expense_attatchments:[
        {
            type:mongoose.Types.ObjectId,
            ref:'attachment'
        }
    ]
    

});

const expenseModel= mongoose.model('expense', expenseSchema);
