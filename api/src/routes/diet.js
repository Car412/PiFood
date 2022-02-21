const {Router} = require ('express');
const {Recipe, Diet} = require ('../db.js');
const router = Router();

router.get('/', async (req, res) => {
    const diets = [
        "gluten free",
        "dairy free",
        "paleolithic",
        "ketogenic",
        "lacto ovo vegetarian",
        "vegan",
        "pescatarian",
        "primal",
        "fodmap friendly",
        "whole 30",
    ]
    diets.forEach(el => {
        Diet.findOrCreate({ 
            where: { name: el }  //por cada tipo de dieta
        })
    })

    const allTypes = await Diet.findAll()
    res.send(allTypes)
})

module.exports = router;