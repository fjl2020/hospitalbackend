const jwt=require('jsonwebtoken')

const validarJWT=(req,res,next)=>{
    //leer el token
    const token=req.header('x-token')
    // const token=req.header('authorization')
    // const token=req.rawHeaders

    if (!token){
        return res.status(401).json({msg:'No hay token en la petición'})
    }
    try {
         const {uid}=jwt.verify(token,process.env.SECRETKEY);
        //  console.log('id user', uid);
         req.uid=uid

    } catch (error) {
        return res.status(401).json({msg:'token incorrecto'})
    }
    // console.log(token);
    next()

}
module.exports={validarJWT}