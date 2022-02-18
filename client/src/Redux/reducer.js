import {
    GET_RECIPES,
    GET_DIETS,
    FILTER_BY_DIET ,
    FILTER_BY_NAME,
    FILTER_BY_SCORE,
    GET_NAME_RECIPES
} from '../Redux/actions'

const initialState = {     
    recipes : [],
    allRecipes: [],
    detail : [],
    diets: []  
};

function rootReducer (state = initialState, action) {
    switch (action.type){
        case GET_RECIPES:
            return {
            ...state,
            recipes: action.payload,     //en mi estado recipes, manda todo lo que envie la accion getrecipes
            allRecipes: action.payload  // el estado que se siempre mantiene con todas las recetas
            }
        
        case GET_NAME_RECIPES:
            return {
            ...state,
            recipes: action.payload
            }
        case GET_DIETS:
            return{
                ...state,
                diets: action.payload
            }    
                  
        case FILTER_BY_DIET:
                const allRecipes= state.allRecipes //copia del estado
                const dietsFilter = action.payload === "All" ? state.allRecipes :
                 allRecipes.filter(recipe => recipe.diets.find(diet => {                
                if (diet.name === action.payload) return recipe                
                }))
                return{
                    ...state,
                    recipes: dietsFilter
                }    
    
    
        case FILTER_BY_NAME: 
            let orderName = action.payload === "asc" ?
             state.recipes.sort(function(a, b){     //sort-> compara y ordena izq o der d
                if (a.name > b.name) {
                    return 1
                   }
                if (b.name > a.name) {
                     return -1
                    }
                    return 0   //si son iguales
    
            }) :
             state.recipes.sort(function(a, b){
                if (a.name > b.name) {
                    return -1
                   }
                if (b.name > a.name) {
                     return 1
                    }
                    return 0
            })
              return {
                  ...state,
                  recipes: orderName
              }              
    
            case FILTER_BY_SCORE:
            let orderScore =
             action.payload === "high" ?
             state.recipes.sort(function (a, b) {
    
              return b.score - a.score;
            }) :
             state.recipes.sort(function (a, b) {
    
              return a.score - b.score;
            })
          
            return {
                ...state,
                recipes: orderScore,
        }   
  
        default: 
        return state
    }
    
    }  
    
    export default rootReducer;