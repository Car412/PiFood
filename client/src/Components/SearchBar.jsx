import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../Redux/actions";

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
    }
    
    return(
        <div>
            <input onChange = {(e)=>handleInputChange(e)} type= "text" placeholder="Search..."/>
            <button onSubmit= {(e)=>handleSubmit(e)} type="submit">Search</button>
        </div>
    )
}