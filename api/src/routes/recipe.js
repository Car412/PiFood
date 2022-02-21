const {Router} = require ('express');
const axios = require ('axios');
const {YOUR_API_KEY} = process.env;
const { Recipe, Diet} = require ('../db.js');
const router = Router();

const getApi = async () =>{
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)
    const apiInfo = await apiUrl.data.results.map(el =>{
        return{
            ID: el.id,                         
            name: el.title,
            image: el.image,
            score: el.spoonacularScore,            
            diets: el.diets.map((d) => { return { name: d } }), // hago map porque devuelve un arreglo, son varios tipos de dieta
            summary: el.summary,
            healthScore: el.healthScore,
            steps: el.analyzedInstructions
        };
    });
    return apiInfo;
};

const getDB = async () =>{
return await Recipe.findAll({
    include: {
        model: Diet,
        attributes: ['name'],  
        through: {
            attributes: [],   
        },
    }
})
}

const getAllrecipes = async ()=>{
const apInfo = await getApi();
const dbInfo = await getDB();
const infoTotal = apInfo.concat(dbInfo); 
return infoTotal;
};

router.get('/', async (req, res)=>{
    const {name} = req.query
    const recipesTotal = await getAllrecipes()
  
    if (name) {
        let recipeName = await recipesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))// se fija si incluye el nombre que viene por query
        recipeName.length ?
            res.status(200).send(recipeName) :
            res.status(404).send("La receta no existe")
    } else {
        res.status(200).send(recipesTotal) // si no hay query, manda todo 
    }
})

router.get('/:id', async (req, res)=>{
    const {id} = req.params;
    const recipesTotal = await getAllrecipes();

    if(id){
        const recipeId = recipesTotal.filter(el=> el.id === id)
        recipeId.length?
        res.status(200).json(recipeId) :
        res.status(404).send('Receta no encontrada') 
    }
});

router.post('/', async (req, res)=>{
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
    const dietDb = await Diet.findAll({where: {name: diets}})       
    
    recipeCreated.addDiet(dietDb)
    res.send('Receta creada con éxito')
})

module.exports = router;