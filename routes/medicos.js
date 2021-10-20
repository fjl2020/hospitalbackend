const { Router } = require('express');
const {check}=require('express-validator')
const { getMedicos, crearMedico , updateMedico, deleteMedico} = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/valida-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router()

router.get('/', validarJWT,getMedicos)
router.post('/',
    [   validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('hospital','El hospital debe ser un id válido').isMongoId(),
        validarCampos,
    ],
    crearMedico)
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),

    
    validarCampos
    ],updateMedico)
router.delete('/:id',validarJWT,deleteMedico)
module.exports = router;