const {response}=require('express')
const bcrypt=require ('bcryptjs')
const {googleVerify}=require('../helpers/google-verify')

const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/jwt')


const login=async (req, res) => {
    try {
        const {email,password}=req.body

        //verifica usuario
        const userDb=await Usuario.findOne({email})
        
        if (!userDb){
            return res.status(404).json({ msg: 'Login error' });    
        }

        // verifica password
        const validPassword=bcrypt.compareSync(password,userDb.password)
        if (!validPassword)
        {
            return res.status(404).json({ msg: 'password error' });    
        }

        const token=await generarJWT(userDb.id)
        res.json({ msg: 'Login ok' ,token});    
        
        
    } catch (error) {
        return res.status(500).json({ msg: 'Hable con el administrador' ,error});
    }
    
}
const googleSignIn=async (req, res)=>{
    // const token=req.body.token
    const {name,email,picture}=await googleVerify(req.body.token)
    const userDb=await Usuario.findOne({email});
    let usuario;
    if (!userDb)
    {
        usuario=new Usuario({
            nombre:name,
            email:email,
            password:'@@@',
            img:picture,
            google:true 
        });
    }else{
        //existe usuario
        usuario=userDb;
        usuario.google=true;
        usuario.password='@@@'
    }
    // Guardar en DB
    await usuario.save();
    const token=await generarJWT(userDb.id)
    try {
        
        res.json({
            msg:'Google Signin',
            token
        })    
    } catch (error) {
        res.status(401).json({
            msg:'Google Signin error',
        })
    }

    
}
const renewToken=async (req,res=response)=>{
    const uid=req.uid
    console.log(uid);
    const token=await generarJWT(uid)
    res.json({
        msg:'Renew token',
        token,
    })
}
module.exports={login,googleSignIn,renewToken};