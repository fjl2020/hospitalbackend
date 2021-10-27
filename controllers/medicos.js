const {response}=require('express')
const Medico = require('../models/medico')
const Hospital = require('../models/hospital')
const bcript=require('bcryptjs')
const {generarJWT}=require('../helpers/jwt')

const getMedicos = async(req, res) => {
    // const medicos=await Medico.find().populate('usuario','nombre img').populate('hopital','nombre');
    const medicos=await Medico.find().populate('usuario','nombre img').populate('hospital','nombre');
    res.json({
        msg:'medicos get',
        medicos
    })
};
const crearMedico = async (req, res) => {

    const uid=req.uid;
    const hospital_id=req.body.hospital;
    const hospital_check=await Hospital.findById(hospital_id)
    console.log(hospital_check);
    if (!hospital_check)
    {
        // console.log(error);
        return res.status(500).json({
            msg:'El hospital no existe'
        });
    }

    const medico=new Medico({
        usuario:req.uid,
        ...req.body
    });


    try {
        const medico_db=await medico.save();
        res.json({
            msg:'Medico salvado...',
            medico_db
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Ocurrio un error inesperado'
        });
    }


}
const updateMedico=async (req,res)=>{
    const id=req.params.id;
    const nombre=req.body.nombre;
    const usuarioId=req.uid
    const medicoDB=await Medico.findById(id);
    if (!medicoDB)
    {
        return res.status(401).json({
            msg:'El medico no existe'
        });
    }
    const cambiosMedicos={
        ...req.body,usuario:usuarioId
    }

    try {
        const medicoAcualizado=await Medico.findByIdAndUpdate(id,cambiosMedicos,{new:true});
        res.json({
            msg:'Medicos actualizados',
            medico:medicoAcualizado
        })
        
    } catch (error) {
        res.status(500).json({
            msg:'Error en médicos update'
        })
        
    }
    
}
const deleteMedico=async(req,res)=>{

    const id =req.params.id;
    const medicoDB=await Medico.findById(id);
    if (!medicoDB)
    {
        return res.status(401).json({
            msg:'El medico no existe'
        });
    }
    try {
        const medicosDel=await Medico.findByIdAndDelete(id);
        res.json({
            msg:'Se borro el medico...'
        })    
    } catch (error) {
        res.status(500).json({
            msg:'Error al borrar'
        })
    }
    
}

module.exports = { getMedicos, crearMedico , updateMedico, deleteMedico}