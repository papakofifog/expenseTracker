require('dotenv').config();
const express= require('express');

const cors= require('cors');

const bodyParser= require('body-parser');



const app= express();

app.use(cors({origin: '*'}));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`)
});
