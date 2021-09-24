const mongoose=require('mongoose')


const dbConnection=async(user,password)=>
{
    try {
        
        await mongoose.connect(process.env.DB_CNN);   
        console.log('db online')
    } catch (error) {
        console.log('Error al conectar db');
        throw Error('Error a la hora de inciar db');
    }
}
module.exports={dbConnection}