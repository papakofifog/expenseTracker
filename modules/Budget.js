const mongoose= require('mongoose');
require('mon')

const BudgetSchema= new mongoose.Schema({
    budgetTitle:{
        type:String,
        required: [true, "budget title is required"]
    },
    description:{
        type: String,
        maxLength: [255, 'description cannot be more that 255 characters long']
    },
    principal_Amount: {
        type: Number,
        get: v => (v/100).toFixed(2),
        set: v => v*100
    },
    CapExpense: {
        type: Number,
        get: v => (v/100).toFixed(2),
        set: v => v*100
    },
    ballance: {
        type: Number,
        get: v => (v/100).toFixed(2),
        set: v => v*100
    },
    budgetType:{
        type: String,
        enum: ['Single', 'Shared'],
        default: ['Single']
    },
    defaultCurrency:{
        type:String,
        default: "GHS",
        required: [true, "default currency required"]
    },
    convertedCurrency:{
        type: String,
        default: "GHS",
        required: [true, "converted currency required"]
    },
    created_by:{
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: [true, "created By is required"]
    },
    updated_by:{
        type: mongoose.Types.ObjectId,
        ref:'user',
        required: [true, "updated by is required"]
    },
    archive_status:{
        type: Boolean,
        default: false
    },
    budget_timming:{
        type: String,
        enum: ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'],
        default:['DAILY']
    }

},{timestamps:true});

const budgetModel= mongoose.model('Budget', BudgetSchema);

async function createBudget(budget){
    try{    
        let newBudget= new budgetModel({
            ...budget
        })
        return newBudget;
    }catch(e){
        console.error(e);
    }
}

async function getOneBudgetById(budget){
    try{
        let selectedBudget= await budgetModel.findOne({_id:budget?.id});
        return selectedBudget;
    }catch(e){
        console.error(e);
    }
}

async function getAllBudgets(){
    try{
        let allBudgets= await budgetModel.find();
        return allBudgets;
    }catch(e){
        console.error(e)
    }
}

async function updateOneBudget(newBudgetDetails){
    try{
        let budget= await budgetModel.updateOne({_id:budget?.id}, {...newBudgetDetails})
        return budget.achknowledged();
    }catch(e){
        console.error(e);
    }
}

