const { Router } = require('express');
const {check}=require('express-validator')
const { busqueda,getDocumentosColeccion} = require('../controllers/busqueda.js');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router()

router.get('/:strBusqueda',validarJWT,busqueda);
router.get('/coleccion/:tabla/:strBusqueda',validarJWT,getDocumentosColeccion);

module.exports=router