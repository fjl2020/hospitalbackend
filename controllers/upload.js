const path=require('path')
const fs=require('fs')
const { response } = require('express')
const Medico = require('../models/medico')
const Usuario = require('../models/usuario')
const Hospital = require('../models/hospital')
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');


const uploadFile = (req, res) => {
    const { tipo, id } = req.params

    const tiposValidos = ['hospitales', 'medicos', 'usuarios']
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            msg: 'los tipos validos son:  usuarios, medicos o hospitales'
        })
    }
    /**upload file  */

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No files were uploaded.' });
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const sampleFile = req.files.imagen;
    // uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name;
    // console.log(sampleFile);
    const nombreCortado = sampleFile.name.split('.')
    const extension = nombreCortado[nombreCortado.length - 1]

    // validar extension
    const tipoExtensionValida = ['jpg', 'png', 'jpeg', 'gif']
    if (!tipoExtensionValida.includes(extension)) {
        return res.status(400).json({
            msg: "las extensiones válidas son 'jpg','png','jpeg','gif'"
        })
    }
    const nombreArchivo = `${uuidv4()}.${extension}`;
    // path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(path, (err)=> {
        if (err)
        {
            console.log(err);
            return res.status(500).json({
                msg:'error al mover la imagen'
            });
        }
        actualizarImagen(tipo,id,nombreArchivo)
        // res.send('File uploaded!');
        res.json({
            'fileUploaded': 'Upload file :' + nombreArchivo,
        }
        );
    });
   
}
const retornaImagen=(req,res)=>{

    const {imgUrl,tipo}=req.params;
    // console.log(imgUrl,tipo);

    console.log(imgUrl);
    let pathImg=path.join(__dirname,`../uploads/${tipo}/${imgUrl}`);
    if (!fs.existsSync(pathImg)){
        console.log('no path');
       pathImg=path.join(__dirname,`../uploads/no-img.jpg`);
    }
 
    res.sendFile(pathImg);

}

module.exports = { uploadFile ,retornaImagen}