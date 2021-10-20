const {response}=require('express')
const Usuario = require('../models/usuario')
const bcript=require('bcryptjs')
const {generarJWT}=require('../helpers/jwt')

const getUsuarios = async(req, res) => {
    const desde=parseInt(req.query.desde || 0)
    const limit=parseInt(req.query.limit || 5)

    // const tinit=(new Date()).getTime()

    // console.log(desde,limit);
    // const usuarios=await Usuario
        // .find({},'nombre email role google').skip(desde).limit(limit);
    // const totalReg=await Usuario.count();
    const [usuarios,totalReg]= await Promise.all([ Usuario
        .find({},'nombre email role google img').skip(desde).limit(limit), 
        Usuario.countDocuments()]);
    
    // console.log('time : ',((new Date()).getTime()-tinit));

    const uid=req.uid
    if(!uid)
    {
        res.status(401).json({msg:'Token no valido'})
    }
    res.json({
        usuarios,uid,total_reg:totalReg
    }
    )
};
const crearUsuarios = async (req, res) => {
    const { nombre, password, email } = req.body
    const usuario = new Usuario(req.body);

    //encriptar contraseña

    const salt=bcript.genSaltSync();
    usuario.password=bcript.hashSync(password,salt)
    //guardo el usuario
    try {
        const existeEmail=await Usuario.findOne({email:email});
        
        // console.log("existe email",existeEmail);
        if (existeEmail){
            return res.status(400).json({
                msg:'El correo ya esta registrado'
            }
            )    
        }


        const userCreated=await usuario.save();
        // console.log(userCreated,userCreated.id);
        const token=await generarJWT(userCreated.id)
        // console.log(token);
        return res.json({
            usuario,
            token
        }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'error encontrado'
        }
        )
    }


}
const updateUsuarios=async (req,res)=>{
    const uid=req.params.id
    // const {rol,email,nombre}=req.body
    const {password,google,email,...campos}=req.body
    try {
        const usuarioDB=await Usuario.findById(uid)
        if (!usuarioDB)
        {
            return res.status(404).json({msg:'No existe usuario con ese id'})
        }
        //Actualizar usuario
        if (usuarioDB.email!=email){
            const existeEmail=await Usuario.findOne({email})
            if (existeEmail)
            {
                return res.status(400).json({'msg':'El email ya existe'})
            }
        }
        // delete campos.password
        // delete campos.google
        
        campos.email=email
        const usuarioActualizado=await Usuario.findByIdAndUpdate(uid,campos,{new:true})
        console.log(usuarioActualizado);

        res.json({'msg':'update user: '+uid,'user updated':usuarioActualizado})    
    } catch (error) {

        res.status(500).json({msg:'Error inesperado en Update usuario'})
    }
    
}
const deleteUsuarios=async(req,res)=>{

    try {
        const userToDelete=await Usuario.findByIdAndDelete(req.params.id)    
        if (!userToDelete){
            return res.status(500).json({msg:'usuario no existe'})
        }
        res.json({msg:'usuario borrado exitosamente'})
    } catch (error) {
       return res.status(500).json({msg:'Error inesperado en Update usuario'})
    }
    
    // res.status(200).json({msg:'delte'})
}

module.exports = { getUsuarios, crearUsuarios ,updateUsuarios,deleteUsuarios}