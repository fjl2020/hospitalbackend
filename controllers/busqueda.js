const { response } = require('express')
const Hospital = require('../models/hospital')
const Usuario = require('../models/usuario')
const Medico = require('../models/medico')


const busqueda = async (req, res) => {

    const strBusqueda = req.params.strBusqueda
    console.log(strBusqueda);
    const regex = new RegExp(strBusqueda, 'i')

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),

    ])


    res.json({
        msg: 'busqueda',
        busqueda: strBusqueda,
        usuarios,
        medicos,
        hospitales
    })

}
const getDocumentosColeccion = async (req, res) => {

    const tabla = req.params.tabla
    const strBusqueda = req.params.strBusqueda
    console.log(strBusqueda, tabla);
    const regex = new RegExp(strBusqueda, 'i')
    const regexTabla = new RegExp(tabla, 'i')
    let coleccion = [];
    switch (tabla.toLowerCase()) {
        case 'usuario':
            coleccion = await Usuario.find({ nombre: regex },'nombre email img');

            break;
        case 'medico':
            coleccion = await Medico.find({ nombre: regex }).populate('usuario', 'nombre img').populate('hospital', 'nombre img');;
            break;
        case 'hospital':
            coleccion = await Hospital.find({ nombre: regex })
                        .populate('usuario', 'nombre img')
                        
            break;
        default:
            return res.status(500).json({
                msg: 'La tabla debe ser usuario, medico o hospital'
            });
            break;
    }

    // const [usuarios,medicos,hospitales]=await Promise.all([
    //     
    //     Medico.find({nombre:regex}),
    //     Hospital.find({nombre:regex}),

    // ])


    res.json({
        msg: 'busqueda',
        busqueda: strBusqueda,
        coleccion,
        // usuarios,
        // medicos,
        // hospitales
        "tabla": tabla
    })

}

module.exports = { busqueda, getDocumentosColeccion }
