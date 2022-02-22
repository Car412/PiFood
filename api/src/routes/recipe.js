const {Router} = require ('express');
const {Recipe, Types} = require ('../db');
const recipe = Router();

recipe.post('/', async (req, res)=>{
    const { name, summary, score, healthScore, steps, diets, image, createdINBd } = req.body;
    const recipeCreated = await Recipe.create({
        name,
        summary,
        score,
        healthScore,
        steps,
        image,
        createdINBd 
    });
    const typesDb = await Types.findAll({where: {name: diets}})       
    
    recipeCreated.addTypes(typesDb)
    res.send('Recipe created successfully')
})

module.exports = recipe;