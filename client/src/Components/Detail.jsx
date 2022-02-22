import React from "react";
import {Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../Redux/actions";
import { useEffect } from "react";

export default function Detail(){
    const dispatch = useDispatch();

    const {id} = useParams();

    useEffect(()=>{
        dispatch(getDetail(id))
    },[]) //eslint-disable-line

    const myRecipe= useSelector((state)=>state.detail)
    console.log(myRecipe)
    
    return(
        <div>      

         
            {Object.keys(myRecipe).length > 0 ?
               <div>
                  <h1>{myRecipe.name && myRecipe.name}</h1>
                  <div>
                     <h5>Type of diet:</h5>
                     <h2>{myRecipe.diets && myRecipe.diets?.map(el => el.name?.toLowerCase() + ", ")}</h2>
                  </div>
                  <div>
                     <h5>Score:</h5>
                     <h2>{myRecipe.score && myRecipe.score}</h2>
                  </div>               
                  <div>
                     <h5>Health Score:</h5>
                     <h2>{myRecipe.healthScore && myRecipe.healthScore}</h2>
                  </div>
                  <div>
                     <h5>Steps:</h5>
                     <div>{myRecipe.steps?.map(e =>                     
                     (<div><span>number:{e.number}</span>
                     <span>step:{e.step}</span>
                     <span>ingredients:{e.ingredients?.map(i=> i.name)}</span></div>
                     ) )}</div>
                  </div>
               </div> : <p>LOADING...</p>
            }
             <Link to='/home'><button>Back</button></Link>          
        

         </div>
      
    )

}
                  
                                    
                  