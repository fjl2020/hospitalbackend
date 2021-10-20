const Usuario=require('../models/usuario')
const Medico=require('../models/medico')
const Hospital=require('../models/hospital')
const fs=require('fs')

const borrarImagen=(path)=>{
    if (fs.existsSync(path))
    {
        fs.unlinkSync(path)
    }
}
const actualizarImagen=async(tipo,id,nombreArchivo)=>{
    let pathViejo='';
    console.log(tipo,id,nombreArchivo);
    switch (tipo) {
        case 'medicos':
            const medico=await Medico.findById(id);
            if (!medico)
                {
                    return false
                }
            pathViejo=`./uploads/medicos/${medico.img}`
            // console.log(pathViejo);
            borrarImagen(pathViejo)
            medico.img=nombreArchivo 
            await medico.save();
            return true;
            break;
        case 'hospitales':
            const hospital=await Hospital.findById(id);
            if (!hospital)
                {
                    return false
                }
            pathViejo=`./uploads/hospitales/${hospital.img}`
            // console.log(pathViejo);
            borrarImagen(pathViejo)
            hospital.img=nombreArchivo
            await hospital.save();
            return true;
            break;
        case 'usuarios':
            const usuario=await Usuario.findById(id);
            if (!usuario)
                {
                    return false
                }
            pathViejo=`./uploads/usuarios/${usuario.img}`
            // console.log(pathViejo);
            borrarImagen(pathViejo)
            usuario.img=nombreArchivo
            await usuario.save();
            return true;
    }

    console.log('vamos bien');
}

module.exports={actualizarImagen}
