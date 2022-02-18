import axios from "axios";

export const GET_RECIPES = 'GET_RECIPES';
export const GET_DIETS = 'GET_DIETS';
export const FILTER_BY_DIET = 'FILTER_BY_DIET';
export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export const FILTER_BY_SCORE = 'FILTER_BY_SCORE';
export const GET_NAME_RECIPES = 'GET_NAME_RECIPES';


export function getRecipes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/recipes")
    return dispatch({
      type: 'GET_RECIPES',
      payload: json.data,

    })
  }
}

export function getDiets() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/types");
    return dispatch({
      type: 'GET_DIETS',
      payload: json.data,
    })
  }
}

export function filterByDiet(payload) {
  return {
    type: 'FILTER_BY_DIET',
    payload,
  }
}

export function postRecipe(payload) {
  return async function (dispatch) {
    const data = await axios.post("http://localhost:3001/recipe", payload)  //post del payload
    return data
  }

}

export function filterByName(payload) {  
  return {
    type: 'FILTER_BY_NAME',
    payload,
  }
}

export function filterByScore(payload) {
  return {
    type: "FILTER_BY_SCORE",
    payload,
  }
}


export function getNameRecipes(name) { //por busqueda -> query
   return async function (dispatch) {
    try {
      
      var json = await axios.get(`http://localhost:3001/recipes?name=${name}`)
        return dispatch({
        type: 'GET_NAME_RECIPES',
        payload: json.data,
      })
    } catch (error) {
      return error
    }
  }
}

export function getRecipeDetail(id) {
  return function (dispatch) {
       axios.get(`http://localhost:3001/recipes/${id}`)
      .then(res => dispatch({type: 'GET_DETAIL', payload: res.data}))
      .catch(err => console.error(err))
   
    }
  
}