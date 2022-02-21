import {
    GET_RECIPES,
    FILTER_DIET,
    ORDER_NAME,
    GET_NAME_RECIPE,
    GET_DIETS,
    POST_RECIPE,
    ORDER_SCORE,

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
            recipes: action.payload, 
            allRecipes: action.payload 
            }
            case FILTER_DIET:
                const allRecipes= state.allRecipes
                const dietsFilt = action.payload === 'All'? allRecipes : allRecipes.filter(el=> el.diets === action.payload)
                return{
                    ...state,
                    recipes: dietsFilt
                }
            case ORDER_NAME:
                let sortedArr = action.payload === 'asc'?
                state.recipes.sort(function(a,b){
                    if(a.name>b.name){
                        return 1;
                    } if(b.name>a.name){
                        return -1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function(a,b){
                    if(a.name>b.name){
                        return -1;
                    } if (b.name>a.name){
                        return 1;
                    }
                    return 0;
                })           
                return{
                    ...state,
                    recipes:sortedArr
                }

            case ORDER_SCORE:
                    let orderSco = action.payload === 'high'?
                    state.recipes.sort(function(a,b){
                        if(a.score> b.score){
                            return 1;
                        }
                        if(b.score>a.score){
                            return -1;
                        }
                        return 0;
                    }) :
                    state.recipes.sort(function(a,b){
                        if(a.score>b.score){
                            return -1;
                        }
                        if(b.score> a.score){
                            return 1;
                        }
                        return 0;
                    })
                return{
                    ...state,
                    recipes: orderSco
                }    
                
            case GET_NAME_RECIPE:
                return{
                    ...state,
                    recipes:action.payload
                }
            case POST_RECIPE:
                return{
                    ...state
                }
            case GET_DIETS:
                return{
                    ...state,
                    diets: action.payload
                } 

            default:
                return state;
    }
        
}      
    export default rootReducer;