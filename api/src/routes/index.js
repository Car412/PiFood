const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const recipeRouter = require('./recipe.js')
const dietRouter = require('./diet.js')

// Configurar los routers
router.use('/recipe', recipeRouter)
router.use('/diet', dietRouter)
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
