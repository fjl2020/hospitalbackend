const { Router } = require('express');
const {check}=require('express-validator')
const { getUsuarios, crearUsuarios, updateUsuarios ,deleteUsuarios} = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/valida-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router()

router.get('/', validarJWT,getUsuarios)
router.post('/',
    [   validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password',' el Password es obligatorio').not().isEmpty(),
        check('email'," El email es obligatorio y debe ser de la forma de email").isEmail(),

        
        validarCampos,
    ],
    crearUsuarios)
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('rol',' el rol es obligatorio').not().isEmpty(),
    check('email'," El email es obligatorio y debe ser de la forma de email").isEmail(),

    
    validarCampos
    ],updateUsuarios)
router.delete('/:id',validarJWT,deleteUsuarios)
module.exports = router;