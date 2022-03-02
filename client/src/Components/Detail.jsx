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
        
    return(
        <div className={estilos.contenedor}>    
        <div>{Object.keys(myRecipe).length > 0 ?
         <div>
           <h1 className={estilos.h1}>{myRecipe.name && myRecipe.name}</h1>
            <div>
              <img className={estilos.img} src={myRecipe.image} alt= 'Recipe img'/>
            </div>
            <div>   
               <h2 className={estilos.h2}>Type of diet:</h2>
               <h5 className={estilos.h5}>{myRecipe.diets && myRecipe.diets?.map(el => el + ", ")}</h5>
            </div>
            <div>
            <h2 className={estilos.h2}>Score:</h2>
             <h5 className={estilos.h5}>{myRecipe.score && myRecipe.score}</h5>
            </div>               
            <div>
             <h2 className={estilos.h2}>Health Score:</h2>
             <h5 className={estilos.h5}>{myRecipe.healthScore && myRecipe.healthScore}</h5>
            </div>
            <div>
              <h2 className={estilos.h2}>Dish Type: </h2>
              <h5 className={estilos.h5}>{myRecipe.dishTypes ? myRecipe.dishTypes.map(d => d.name) : 'Dish type not found'}</h5>
            </div>            
            <div>
             <h2 className={estilos.h2}>Summary:</h2>
             <p className={estilos.h5} dangerouslySetInnerHTML={{ __html: myRecipe.summary}}></p>             
            </div>
            <div>
             <h2 className={estilos.h2}>Steps:</h2>
             <h5 className={estilos.h5}>{Array.isArray(myRecipe.steps) ? myRecipe.steps.map(e => {
                    return(
                        <li>{e.step}</li>
                        )
                }) :
                <li>{myRecipe.steps}</li>
                }</h5>
                          
            
            </div>
            </div> : <p className={estilos.p}>LOADING...</p>
          }
           <Link to='/home'><button className={estilos.boton}>Back</button></Link>
           </div>
           </div>
         )
     
     }           
             
     
     
         
            

                  
                                    
                  