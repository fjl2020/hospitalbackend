const {response}=require('express')
const Hospital = require('../models/hospital')

const getHospital = async(req, res) => {
//    const hospitales=await Hospital.find().populate('usuario',['nombre','email']);
   const hospitales=await Hospital.find().populate('usuario','nombre img' );
    const uid=req.uid
    if(!uid)
    {
        res.status(401).json({msg:'Token no valido'})
    }
    res.json({
        hospitales,uid
    }
    )
};
const crearHospital = async (req, res) => {
    
    const { nombre } = req.body
    const uid=req.uid;
    const hospital =  new Hospital({
        usuario:uid,
        ...req.body}
        );
    try {
       
        const hospitaldb=await hospital.save();
        return res.json({
            msg:'Hospital creado',
            hospital:hospitaldb
        })    ;
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Error inesperado'
        })    
    }
    
    // //encriptar contraseña

    // const salt=bcript.genSaltSync();
    // usuario.password=bcript.hashSync(password,salt)
    // //guardo el usuario
    // try {
    //     const existeEmail=await Usuario.findOne({email:email});
        
    //     // console.log("existe email",existeEmail);
    //     if (existeEmail){
    //         return res.status(400).json({
    //             msg:'El correo ya esta registrado'
    //         }
    //         )    
    //     }


    //     const userCreated=await usuario.save();
    //     // console.log(userCreated,userCreated.id);
    //     const token=await generarJWT(userCreated.id)
    //     // console.log(token);
    //     return res.json({
    //         usuario,
    //         token
    //     }
    //     )
    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({
    //         msg:'error encontrado'
    //     }
    //     )
    // }


}
const updateHospital=async (req,res)=>{
    res.json({
        msg:'hospital update'
    })
    // const uid=req.params.id
    // // const {rol,email,nombre}=req.body
    // const {password,google,email,...campos}=req.body
    // try {
    //     const usuarioDB=await Usuario.findById(uid)
    //     if (!usuarioDB)
    //     {
    //         return res.status(404).json({msg:'No existe usuario con ese id'})
    //     }
    //     //Actualizar usuario
    //     if (usuarioDB.email!=email){
    //         const existeEmail=await Usuario.findOne({email})
    //         if (existeEmail)
    //         {
    //             return res.status(400).json({'msg':'El email ya existe'})
    //         }
    //     }
    //     // delete campos.password
    //     // delete campos.google
        
    //     campos.email=email
    //     const usuarioActualizado=await Usuario.findByIdAndUpdate(uid,campos,{new:true})
    //     console.log(usuarioActualizado);

    //     res.json({'msg':'update user: '+uid,'user updated':usuarioActualizado})    
    // } catch (error) {

    //     res.status(500).json({msg:'Error inesperado en Update usuario'})
    // }
    
}
const deleteHospital=async(req,res)=>{
    res.json({
        msg:'hospital delete'
    })

    // try {
    //     const userToDelete=await Usuario.findByIdAndDelete(req.params.id)    
    //     if (!userToDelete){
    //         return res.status(500).json({msg:'usuario no existe'})
    //     }
    //     res.json({msg:'usuario borrado exitosamente'})
    // } catch (error) {
    //    return res.status(500).json({msg:'Error inesperado en Update usuario'})
    // }
    
    // res.status(200).json({msg:'delte'})
}

module.exports = { getHospital, crearHospital ,updateHospital,deleteHospital}