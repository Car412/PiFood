const {Router} = require ('express');
const axios = require ('axios');
const API_KEY = process.env;
const { Recipe, Diet} = require ('../db.js');
const router = Router();


// primero me creo una const donde me traigo desde la api la info, la mapeo y retorno solo lo que necesito
const getApi = async () =>{
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
    const apiInfo = await apiUrl.data.map(el =>{
        return{
            ID: el.id,                         
            name: el.title,
            image: el.image,
            score: el.spoonacularScore,            
            diets: el.diets.map((d) => { return { name: d } }),
            summary: el.summary,
            healthScore: el.healthScore,
            steps: el.analyzedInstructions
        };
    });
    return apiInfo; // traigo la info de la api
};

// otra donde me guarlo la info de la bd, incluidos los tipos de dieta.
const getDB = async () =>{
return await Recipe.findAll({
    include: {
        model: Diet,
        attributes: ['name'],  //include el modeloDiet para que se genere la relacion 
        through: {
            attributes: [],   //mediente los atributos ->  me traeria todos en caso de que fueran más sin la comprobacion through
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
    const recipesTotal = await getAllRecipes()
  
    if (name) {
        let recipeName = recipesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))  //si incluye el nombre que viene por query
        recipeName.length ?
            res.status(200).send(recipeName) :
            res.status(404).send("La receta no existe")
    } else {
        res.status(200).send(recipesTotal)
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

router.post('/recipe', async (req, res)=>{
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

    for (let i = 0; i < diets.length; i++) {   //el tipo de dieta debo encontrarlo en el modelo
        const diet = await Diet.findOne({       //encontrar la dieta en el modelo Diet
            where: { name: diets[i] }        //todas las que coincidan con el nombre que llega por body
        })
        recipeCreated.addDiet(diet)        //metodo de sql
    }
    res.send('Receta creada con éxito')
})



module.exports = router;