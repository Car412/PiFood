const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const recipes = require('./recipes');
const types = require('./types');
const recipe = require('./recipe');

// Configurar los routers

router.use('/recipes', recipes)
router.use('/recipe', recipe)
router.use('/types', types)

// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
