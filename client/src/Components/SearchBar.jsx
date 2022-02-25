import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../Redux/actions";
import estilos from './SearchBar.module.css';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName]= useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameRecipes(name))
        setName('');
    }
    
    return (
        <div className={estilos.contenedor}>
            <input
                value = {name}
                placeholder= 'Recipe...'
                type='text'                
                onChange={(e) => handleInputChange(e)}
                className={estilos.input}
            />
            <button type='submit' onClick={(e) => handleSubmit(e)} className={estilos.boton1}>Search</button>
                

        </div>
    )
}