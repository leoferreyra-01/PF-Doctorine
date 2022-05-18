const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const calendar = require('./calendar');
const medic = require('./medic');
const  pacient= require('./pacient');
const hc = require('./hc')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/types', typesRouter);

router.use('/medic', medic);
// router.use('/pacients', pacient);
// router.use('/hc', hc);
// router.use('/calendar', calendar);

module.exports = router