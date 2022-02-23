import React from "react";
import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {postRecipe, getTypes} from '../Redux/actions'
import estilos from './RecipeCreate.module.css';

function validate (input){
    let error= {};
    if(!input.name){
        error.name = 'Name is required';
    }else if(!input.summary){
        error.summary = 'Summary is required';
    }else if(input.score > 10){
        error.score = 'The Score has to be lower or equal than 10'
    }
    return error;
}

export default function RecipeCreate(){
    const dispatch= useDispatch();    
    const diets = useSelector((state)=> state.diets)
    const [error, setError] = useState({})

    const [input, setInput] = useState({
        name: '',
        summary:'',
        score:0,
        healthScore:0,
        steps:'',
        image:'',
        diets:[],
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
    }

    function handleSelect(e){
        setInput({
            ...input,
            diets:[...input.diets, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postRecipe(input))
        alert('Recipe ok!')
        setInput({
            name: '',
        summary:'',
        score:0,
        healthScore:0,
        steps:'',
        image:'',
        diets:[],
        })        

    }

    useEffect(()=>{
        dispatch(getTypes());
    }, [dispatch]);

    return(
        <div className={estilos.contenedor}>
            
            <h1 className={estilos.h1}>Create your Recipe!</h1>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input className={estilos.input}type= 'text' value={input.name} name= 'name' onChange={(e)=>handleChange(e)}></input>
                    {error.name && (<p>{error.name}</p>)}
                </div>
                <div>
                    <label>Summary: </label>
                    <input className={estilos.input} type= 'text' value={input.summary} name= 'summary'onChange={(e)=>handleChange(e)}></input>
                    {error.summary && (<p>{error.summary}</p>)}
                </div>
                <div>
                    <label>Score: </label>
                    <input className={estilos.input} type= 'number' value={input.score} name= 'score' onChange={(e)=>handleChange(e)}></input>
                    {error.score && (<p>{error.score}</p>)}
                </div>
                <div>
                    <label>Health score: </label>
                    <input className={estilos.input} type= 'number' value={input.healthScore} name= 'healthScore'onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                    <label>Steps: </label>
                    <input className={estilos.input} type= 'textarea' value={input.steps} name= 'steps'onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                <label>Select Diets: </label>                   
                <select onChange={(e)=> handleSelect(e)}>
                    
                    {diets?.map((d)=>(<option value={d.name}>{d.name}</option>))}                       
                    
                </select> 
                </div>              

                <button type="submit" className={estilos.boton1}>Create Recipe</button>
                <Link to='/home'><button className={estilos.boton1}>Back</button></Link> 

            </form>
        </div>
    )
}

