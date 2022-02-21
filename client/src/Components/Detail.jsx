import React from "react";
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../Redux/actions";
import { useEffect } from "react";

export default function Detail(props){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    },[])

    const myRecipe= useSelector((state)=>state.detail)
    
    return(
        <div>       

         
            {myRecipe.length > 0 ?
               <div>
                  <h1>{myRecipe[0].name && myRecipe[0].name}</h1>
                  <div>
                     <h5>Type of diet:</h5>
                     <h2>{myRecipe[0].diets && myRecipe[0].diets.map(el => el.name.toLowerCase() + ", ")}</h2>
                  </div>
                  <div>
                     <h5>Score:</h5>
                     <h2>{myRecipe[0].score && myRecipe[0].score}</h2>
                  </div>               
                  <div>
                     <h5>Health Score:</h5>
                     <h2>{myRecipe[0].healthScore && myRecipe[0].healthScore}</h2>
                  </div>
                  <div>
                     <h5>Steps:</h5>
                     <h4>{Array.isArray(myRecipe[0].steps) ? myRecipe[0].steps.map(e => e.steps.map(f => f.step)) : myRecipe[0].steps}</h4>
                  </div>
               </div> : <p>LOADING...</p>
            }
             <Link to='/home'><button>Back</button></Link>          
        

         </div>
      
    )

}
                  
                                    
                  