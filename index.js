const express=require('express');
const {dbConnection}=require('./database/config')
const cors=require('cors')
require('dotenv') .config()

const app=express();
app.use(cors)
dbConnection();

app.set('port',process.env.PORT||3000);

app.listen(app.get('port'),()=>{
    console.log('server running on port '+app.get('port'));
})

app.get('/',(req,res)=>{
     res.status(201).json({
         message:'everything is ok'})});