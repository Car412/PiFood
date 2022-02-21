import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getRecipes, filterByDiets, orderByName, orderByScore} from "../Redux/actions";
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
    },[dispatch]) 

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleFilterDiet(e){
        dispatch(filterByDiets(e.target.value))
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
               <select onChange={e=>handleSort(e)}>
                    <option value='asc'>A to Z</option>
                    <option value='desc'>Z to A</option>
                </select>              
                <select onChange={e=>handleFilterDiet(e)} > 
                    <option value='All'>All Diets</option>
                    <option value='gluten free'>Gluten Free</option>
                    <option value='dairy free'>Dairy Free</option>
                    <option value='paleolithic'>Paleolithic</option>
                    <option value='ketogenic'>Ketogenic</option>
                    <option value='lacto ovo vegetarian'>Lacto Ovo Vegetarian</option>
                    <option value='vegan'>Vegan</option>
                    <option value='pescatarian'>Pescatarian</option>
                    <option value='primal'>Primal</option>
                    <option value='fodmap friendly'>Fodmap Friendly</option>
                    <option value='whole 30'>Whole 30</option>                    
                </select> 
                <select onChange={e=> handleScore(e)}>
                    <option value='high'>High Score</option>
                    <option value='low'>Low Score</option>
                </select>  
                <Paginado
                key= {1}
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length}
                paginado={paginado}
                />   

                <SearchBar/>                         
                
                {currentRecipes?.map((el)=>{ // tomar solo las recetas que me devuelve el paginado
                    return( 
                        <Fragment>                      
                            <Link to={'/home/' + el.id}>
                                <Card key={el.id} img={el.img} name={el.name} diet={el.diet}/>
                            </Link>   
                            </Fragment>                         
                    )
                })                
                }
                
            </div>
        </div>
    )
}