const express=require('express');
const {dbConnection}=require('./database/config')
const cors=require('cors')
require('dotenv') .config()

const app=express();
app.use(cors())

//lectura y parseo del body

app.use(express.json());

dbConnection();

app.set('port',process.env.PORT||3000);

app.use('/api/usuarios',require('./routes/usuarios'))
app.use('/api/login',require('./routes/auth'))


//rutas
// app.get('/',(req,res)=>{
//      res.status(201).json({
//          message:'everything is ok'})});
// app.get('/api/usuarios',(req,res)=>{
//      res.status(201).json({
//          message:'everything is ok'})});
app.listen(app.get('port'),()=>{
    console.log('server running on port '+app.get('port'));
})

