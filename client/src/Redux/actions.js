import axios from "axios";

export const GET_RECIPES = 'GET_RECIPES';
export const FILTER_DIET = 'FILTER_DIET';
export const ORDER_NAME = 'ORDER_NAME';
export const GET_NAME_RECIPE = 'GET_NAME_RECIPE';
export const GET_DIETS = 'GET_DIETS';
export const POST_RECIPE= 'POST_RECIPE';
export const ORDER_SCORE = 'ORDER_SCORE';


export function getRecipes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/recipes",{

    });
    return dispatch({
      type: 'GET_RECIPES',
      payload: json.data,
    })
  }
}

export function getNameRecipes(name){
  return async function(dispatch){
    try {
      var json = await axios.get(`http://localhost:3001/recipes?name=${name}`)
      return dispatch({
        type: 'GET_NAME_RECIPE',
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function filterByDiets(payload){
  return{
    type: 'FILTER_DIET',
    payload
  }
}

export function orderByName(payload){
  return{
    type: 'ORDER_NAME',
    payload
  }
}

export function orderByScore(payload){
  return{
    type: 'ORDER_SCORE',
    payload
  }
}

export function getDiets(){
  return async function(dispatch){
    var json= await axios.get("http://localhost:3001/types");
    return dispatch({
      type: 'GET_DIETS',
      payload: json.data
    })
  }
}

export function postRecipe(payload){
  return async function(dispatch){
    var json= await axios.post("http://localhost:3001/recipe", payload);
    return json;
  }
}