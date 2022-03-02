import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getRecipes, orderByName, orderByScore, filterByTypes, getTypes} from "../Redux/actions";
import {Link} from "react-router-dom";
import Card from "../Components/Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import estilos from './Home.module.css';

export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state)=> state.recipes)
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage]= useState(9) //eslint-disable-line
    const indexOfLastRecipe = currentPage * recipesPerPage 
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
    const [orden, setOrden] = useState('') //eslint-disable-line
    const [orden1, setOrden1] = useState('') //eslint-disable-line

    const paginado = (pageNumber) =>{ // esta ctte me va a ayudar al renderizado
        setCurrentPage(pageNumber)//setea la pag en el numero que yo vaya apretando
    }

    useEffect(()=>{
        dispatch(getRecipes());
        dispatch(getTypes());
    },[dispatch]) 

    const types = useSelector(state=> state.types)

    function handleFilterTypes(e){
        dispatch(filterByTypes(e.target.value))
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1); // empieza a ordenar desde la primera pág
        setOrden(`ordenado ${e.target.value}`)
    }

    function handleScore(e){
        e.preventDefault();
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1);
        setOrden1(`ordenado ${e.target.value}`)
    }
    
    return(
        <div className={estilos.contenedor}>
            <Link to= '/recipe' className={estilos.recipeCreate}><button className={estilos.boton1}>Create Recipe</button></Link>
            <h1 className={estilos.h1}>Recipes</h1>                       
            <div>            
            <select onChange={e=>handleSort(e)} className={estilos.select}>
                <option value='asc'>A to Z</option>
                <option value='desc'>Z to A</option>
            </select>              
            <select onChange={e=>handleFilterTypes(e)} className={estilos.select}> 
                <option value='All'>All Diets</option>
                {types?.map(diet=> <option value={diet.name} key={diet.name}>{diet.name}</option> )}                                    
            </select> 
            <select onChange={e=> handleScore(e)} className={estilos.select}>
                <option value='high'>High Score</option>
                <option value='low'>Low Score</option>                 
            </select>
            
            <SearchBar className={estilos.boton1}/>
            
            <div className={estilos.card}>                         
                {currentRecipes?.map((el)=>{ // tomar solo las recetas que me devuelve el paginado
                    return( 
                        <Fragment>                      
                            <Link to={'/recipes/' + el.ID} key={'l' + el.ID}>
                                <Card key={el.ID} id={el.ID} img={el.image} name={el.name} diet={el.diets}/>
                            </Link>   
                            </Fragment>                         
                    )})                               
                }
            </div>
            <div>
            <Paginado key= {1} recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginado={paginado}/>
            </div>
                
            </div>
        </div>
    )
}          
                              
                              
                                              

                
                
                
                 

