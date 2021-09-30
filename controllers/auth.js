const {response}=require('express')
const bcrypt=require ('bcryptjs')


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

module.exports={login};