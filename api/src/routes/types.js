const { Router } = require('express');
const { Types } = require('../db');
const axios = require ('axios');

const types = Router();

types.get('/', async (req, res) => {
    const diets= await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=a05c56b6fe3e455c967a1e7e9b62c0ef&number=100&addRecipeInformation=true')
    let types = []
    diets.data.results.forEach(el=> types.push(...el.diets))
    types = [...new Set(types)] 
          

    types.forEach(el => {
        Types.findOrCreate({ 
            where: { name: el }
        })
    })

    const allTypes = await Types.findAll({
        attributes:['name']
    })
    res.send(allTypes)
})


module.exports = types;