const jwt =require('jsonwebtoken')

const generarJWT=(uid)=>{
    const payload={
        uid
    }
    return new Promise((resolve,reject)=>{
        jwt.sign(payload,process.env.SECRETKEY,{
            expiresIn:'12h'
        },(err,token)=>
            {
                if (err){
                    //  console.log(err);
                    reject('no se pudo generar el JWT')
                    }
                else{
                    resolve(token)
                }
                
            }
        );
    })
    

}
module.exports={generarJWT,}