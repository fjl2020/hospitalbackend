
/*
    ruta: api/hospitales
*/
const { Router } = require('express');
const {check}=require('express-validator')
const { getHospital, crearHospital, updateHospital ,deleteHospital} = require('../controllers/hospital.js');
const { validarCampos } = require('../middlewares/valida-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router()

router.get('/', validarJWT,getHospital)
router.post('/',
    [   validarJWT, 
        check('nombre','El nombre del hospital es obligatorio').not().isEmpty(),
        // check('password',' el Password es obligatorio').not().isEmpty(),
        // check('email'," El email es obligatorio y debe ser de la forma de email").isEmail(),

        
        validarCampos,
    ],
    crearHospital)
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre del hospital es obligatorio').not().isEmpty(),
    // check('rol',' el rol es obligatorio').not().isEmpty(),
    // check('email'," El email es obligatorio y debe ser de la forma de email").isEmail(),

    
    validarCampos
    ],updateHospital)
router.delete('/:id',validarJWT,deleteHospital)
module.exports = router;