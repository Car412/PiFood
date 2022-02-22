import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getRecipes, orderByName, orderByScore, filterByTypes, getTypes} from "../Redux/actions";
import {Link} from "react-router-dom";
import Card from "../Components/Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state)=> state.recipes)
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage]= useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage 
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
    const [orden, setOrden] = useState('')
    const [orden1, setOrden1] = useState('')

    const paginado = (pageNumber) =>{ // esta ctte me va a ayudar al renderizado
        setCurrentPage(pageNumber)//setea la pag en el numero que yo vaya apretando
    }

    useEffect(()=>{
        dispatch(getRecipes());
        dispatch(getTypes());
    },[dispatch]) 

    const types = useSelector(state=> state.types)


    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleFilterTypes(e){
        dispatch(filterByTypes(e.target.value))
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1); // empieza a ordenar desde la primera pág
        setOrden(`ordenado ${e.target.value}`) // modifica el estado local y se renderiza
    }

    function handleScore(e){
        e.preventDefault();
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1);
        setOrden1(`ordenado ${e.target.value}`)
    }
    
    return(
        <div>
            <Link to= '/recipe'>Create Recipe</Link>
            <h1>Food</h1>
            <button onClick={e=> {handleClick(e)}}>Reload</button>            
            <div>
            <SearchBar/>
               <select onChange={e=>handleSort(e)}>
                    <option value='asc'>A to Z</option>
                    <option value='desc'>Z to A</option>
                </select>              
                <select onChange={e=>handleFilterTypes(e)} > 
                    <option value='All'>All Diets</option>
                    {types?.map(diet=> <option value={diet.name} key={diet.name}>{diet.name}</option> )}                                    
                </select> 
                <select onChange={e=> handleScore(e)}>
                    <option value='high'>High Score</option>
                    <option value='low'>Low Score</option>
                </select>                                
                <div>                         
                {currentRecipes?.map((el)=>{ // tomar solo las recetas que me devuelve el paginado
                    return( 
                        <Fragment>                      
                            <Link to={'/recipes/' + el.ID} key={'l' + el.ID}>
                                <Card key={el.ID} img={el.image} name={el.name} diet={el.diet}/>
                            </Link>   
                            </Fragment>                         
                    )
                })                
                }
                </div>
                <div>
                <Paginado key= {1} recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginado={paginado}/>
                </div>
                
            </div>
        </div>
    )
}
                
                
                
                 

