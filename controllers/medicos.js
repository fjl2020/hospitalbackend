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
    res.json({
        msg:'medicos update'
    })
    
}
const deleteMedico=async(req,res)=>{
    res.json({
        msg:'medicos delete'
    })
}

module.exports = { getMedicos, crearMedico , updateMedico, deleteMedico}