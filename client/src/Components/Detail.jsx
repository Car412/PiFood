import React from "react";
import {Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../Redux/actions";
import { useEffect } from "react";
import estilos from './Detail.module.css';

export default function Detail(){
    const dispatch = useDispatch();

    const {id} = useParams();

    useEffect(()=>{
        dispatch(getDetail(id))
    },[]) //eslint-disable-line

    const myRecipe= useSelector((state)=>state.detail)
    console.log(myRecipe)
    
    return(
        <div className={estilos.contenedor}>      

         
            {Object.keys(myRecipe).length > 0 ?
               <div>
                  <h1 className={estilos.h1}>{myRecipe.name && myRecipe.name}</h1>
                  <div className={estilos.divImg}>
                     <img src={myRecipe[0].image} alt='img not found' className={estilos.imagen}/>
                  </div>
                  <div>   
                     <h5 className={estilos.h5}>Type of diet:</h5>
                     <h2 className={estilos.h2}>{myRecipe.diets && myRecipe.diets?.map(el => el.name?.toLowerCase() + ", ")}</h2>
                  </div>
                  <div>
                     <h5 className={estilos.h5}>Score:</h5>
                     <h2 className={estilos.h2}>{myRecipe.score && myRecipe.score}</h2>
                  </div>               
                  <div>
                     <h5 className={estilos.h5}>Health Score:</h5>
                     <h2 className={estilos.h2}>{myRecipe.healthScore && myRecipe.healthScore}</h2>
                  </div>
                  <div>
                     <h5 className={estilos.h5}>Steps:</h5>
                     <div className={estilos.steps}>{myRecipe.steps?.map(e =>                     
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
                  
                                    
                  