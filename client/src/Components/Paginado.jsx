import React from "react";

export default function Paginado({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = []

    for(var i = 0; i <= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i+1)
    }
    return(
        <nav>
            <ul>
                {pageNumbers && pageNumbers.map(number=>(
                    <li key={number}>
                    <button onClick={()=>paginado(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}