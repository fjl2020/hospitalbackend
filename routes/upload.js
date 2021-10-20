/*
    /api/upload/coleccion/id
*/

const {Router} =require('express');
const { uploadFile,retornaImagen} = require('../controllers/upload');

const fileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router()

// default options middleware con la configuracion por defecto 
router.use(fileUpload());

router.put('/:tipo/:id',validarJWT,uploadFile)
router.get('/:tipo/:imgUrl',validarJWT,retornaImagen)

module.exports =router