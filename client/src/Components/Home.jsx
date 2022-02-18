import React from "react";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getRecipes, filterByDiet, filterByScore, filterByName } from "../Redux/actions";
import {Link} from "react-router-dom";
import Card from "../Components/Card";
import Paginado from "./Paginado";

export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state)=> state.recipes) // traeme todo lo que está en el estado de recipes
    const [currentPage, setCurrentPage] = useState(1) // lo seteo en 1 porque siempre arranco en la primer pagina
    const [recipesPerPage, setRecipesPerPage]= useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage // 9
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage // 0
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
    const [orden, setOrden] = useState('')
    const [orden1, setOrden1] = useState('')

    const paginado = (pageNumber) =>{ // esta ctte me va a ayudar al renderizado
        setCurrentPage(pageNumber)//setea la pag en el numero que yo vaya apretando
    }


    useEffect(()=>{ // traigo del estado las recetas cuando el componente se monta
        dispatch(getRecipes());
    },[dispatch]) //2do parametro del useEffect, le paso el array con el dispatch que es de lo que depende este componentDidmount para que no se genere un loopInfinito

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());// receteo la pag y que me traiga todo de nuevo
    }

    function handleOrderByName(e) {
        e.preventDefault()
        dispatch(filterByName(e.target.value))  //despacho la action
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)  //para cuando setee la pagina modifique el estado local y se renderice
      }

    function handleDiets(e) {
        e.preventDefault()
        dispatch(filterByDiet(e.target.value));
      }

      function handleOrderByScore(e) {
        e.preventDefault()
        dispatch(filterByScore(e.target.value))
        setCurrentPage(1)
        setOrden1(`Ordenado ${e.target.value}`)
      }
    
    return(
        <div>
            <Link to= '/recipe'>Create Recipe</Link>
            <h1>FooD</h1>
            <button onClick={e=> {handleClick(e)}}> 
            </button>
            <div>
               <select onChange={e=>{handleOrderByName(e)}}>
                    <option value='asc'>Ascendente</option> {/*necesito pasarle un value para poder mandar las cosas por payload*/}
                    <option value='desc'>Descendente</option>
                </select>              
                <select onChange={e=>{handleDiets(e)}}> 
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
                <select onChange={e=>{handleOrderByScore(e)}}>
                    <option value='high'>High Score</option>
                    <option value='low'>Low Score</option>
                </select>  
                <Paginado
                key= {1}
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length}
                paginado={paginado}
                />
                              
                <div>
                {currentRecipes?.map((el)=>{
                    return(                       
                            <Link key ={el.id} to={`recipes/${el.ID}`}>
                                <Card key={el.id} img={el.img} name={el.name} diet={el.diet}/>
                            </Link>                        
                    )
                })                
                }
                </div>
            </div>
        </div>
    )
}