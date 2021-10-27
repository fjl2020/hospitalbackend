const { Router } = require("express");
const { login, googleSignIn ,renewToken} = require("../controllers/auth");
const { check } = require('express-validator');
const { validarCampos } = require("../middlewares/valida-campos");
const {validarJWT} =require('../middlewares/validar-jwt')

const router = Router()

router.post('/', [
    check('email', 'El email es obligatorio y debe ser de la forma de email').isEmail(),
    check('password', 'Debe enviar el password').not().isEmpty(),
    validarCampos
], login);
router.post('/google',[
    check('token', 'El token es obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn);
router.get('/renew', validarJWT,renewToken)

module.exports = router