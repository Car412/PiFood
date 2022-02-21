import axios from "axios";

export const GET_RECIPES = 'GET_RECIPES';
export const FILTER_TYPES = 'FILTER_TYPES';
export const ORDER_NAME = 'ORDER_NAME';
export const GET_NAME_RECIPE = 'GET_NAME_RECIPE';
export const GET_TYPES = 'GET_TYPES';
export const POST_RECIPE= 'POST_RECIPE';
export const ORDER_SCORE = 'ORDER_SCORE';
export const GET_DETAILS = 'GET_DETAILS';


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

export function filterByTypes(payload){
  return{
    type: 'FILTER_TYPES',
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

export function getTypes(){
  return async function(dispatch){
    var json= await axios.get("http://localhost:3001/types");
    return dispatch({
      type: 'GET_TYPES',
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

export function getDetail(id) {
  return async function(dispatch){
    try {
      var json= await axios.get(`http://localhost:3001/recipes/${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}