require('dotenv').config();
const {handleErrors}= require('./middleware/errorHandling');
const express= require('express');

const cors= require('cors');

const bodyParser= require('body-parser');
const { success } = require('./middleware/handleResponses');
const {connectToDb}= require('./Settings/connectToDb')
const {appRouter}= require('./Routes/appRoutes');
const {UserRouter}= require('./Routes/UserRoutes');



const app= express();



app.use(cors({origin: '*'}));
// //This is what was used before
// app.use(bodyParser.json());

//currently express.json() is not used, for extracting json from the client.
app.use(express.json());
connectToDb();

app.use('/api/v1',appRouter);
app.use('/api/v1', UserRouter);

app.use(success);
app.use(handleErrors);



app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`)
});
