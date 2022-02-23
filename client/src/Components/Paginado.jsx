import React from "react";
import estilos from './Paginado.module.css';

export default function Paginado({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = []

    for(var i = 0; i <= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i+1)
    }
    return(
        <nav className={estilos.nav}>
            <ul className={estilos.ul}>
                {pageNumbers && pageNumbers.map(number=>(
                    <li key={number} className={estilos.li}>
                    <button className={estilos.boton}onClick={()=>paginado(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}