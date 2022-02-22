require('dotenv').config();
const {Router} = require ('express');
const axios = require ('axios');
const YOUR_API_KEY = process.apiKey;
const { Recipe, Types} = require ('../db.js');
const recipes = Router();

const getApi = async () =>{
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=a05c56b6fe3e455c967a1e7e9b62c0ef`)
    console.log(apiUrl)
    const apiInfo = await apiUrl.data.results.map(el =>{
        return{
            ID: el.id,                         
            name: el.title,
            image: el.image,
            score: el.spoonacularScore,            
            diets: el.diets,
            summary: el.summary,
            healthScore: el.healthScore,
            steps: el.analyzedInstructions[0]?.steps
        };
    });
    return apiInfo;
};

const getDB = async () =>{
return await Recipe.findAll({
    include: {
        model: Types,
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
const infoTotal = [...apInfo, ...dbInfo]; 
return infoTotal;
};

recipes.get('/', async (req, res)=>{
    const {name} = req.query
    const recipesTotal = await getAllrecipes()
  
    if (name) {
        let recipeName = recipesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))// se fija si incluye el nombre que viene por query
        recipeName.length ?
            res.status(200).send(recipeName) :
            res.status(404).send("Recipe doesn't exist")
    } else {
        res.status(200).send(recipesTotal) // si no hay query, manda todo 
    }
})

recipes.get('/:id', async (req, res)=>{
    const {id} = req.params;
    const recipesTotal = await getAllrecipes();

    if(id){
        const recipeId = recipesTotal.filter(el=> el.ID?.toString() === id)
        recipeId.length?
        res.status(200).send(recipeId) :
        res.status(404).send('Recipe not found') 
    }
});

module.exports = recipes;