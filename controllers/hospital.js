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
    const id=req.params.id
    const {nombre}=req.body
    // console.log(id);/
    const hospitalDB=await Hospital.findById(id)
    if (!hospitalDB){
        return res.status(401).json({
            msg:'El hospital no existe'
        })    

    }
   try {
       const cambiosHospital={
           ...req.body,usuario:req.uid
       }

       const cambiosActualizados=await Hospital.findByIdAndUpdate(id,cambiosHospital,{new:true})
    //    hospitalDB.nombre=nombre;
    //    hospitalDB.save();
       res.json({
           msg:'hospital update',
           hospital:cambiosActualizados
       });
       
   } catch (error) {
       console.log(error);
    res.status(500).json({
        msg:'Error al actualizar...'
    })
   }
   
    
}
const deleteHospital=async(req,res)=>{
    const id=req.params.id;
    const hospitalDB=await Hospital.findById(id)
    if (!hospitalDB){
        return res.status(401).json({
            msg:'El hospital no existe'
        })    

    }
    try {

        const hospitalDel=await Hospital.findByIdAndDelete(id)
        
        res.json({
            msg:'hospital delete',
        })    
    } catch (error) {
        res.status(500).json({
            msg:'Error hospital delete',
        })
    }
    

    
}

module.exports = { getHospital, crearHospital ,updateHospital,deleteHospital}