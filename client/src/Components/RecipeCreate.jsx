import React from "react";
import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {postRecipe, getDiets} from '../Redux/actions'

export default function RecipeCreate(){
    const dispatch= useDispatch();    
    const diets = useSelector((state)=> state.diets)

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
        dispatch(getDiets());
    }, [dispatch]);

    return(
        <div>
            <Link to='/home'><button>Back</button></Link>
            <h1>Create your Recipe!</h1>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input type= 'text' value={input.name} name= 'name' onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                    <label>Summary:</label>
                    <input type= 'text' value={input.summary} name= 'summary'onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                    <label>Score:</label>
                    <input type= 'number' value={input.score} name= 'score' onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                    <label>Health score:</label>
                    <input type= 'number' value={input.healthScore} name= 'healthScore'onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                    <label>Steps:</label>
                    <input type= 'textarea' value={input.steps} name= 'steps'onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                    <label>Image:</label>
                    <input type= 'text' value={input.image} name= 'image' placeholder="url image" onChange={(e)=>handleChange(e)}></input>
                </div>
                <select onChange={(e)=> handleSelect(e)}>
                    {diets.map((d)=>(
                        <option value={d.name}>{d.name}</option>
                    ))}
                </select>
                <ul><li>{input.diets.map(el=>el + " ,")}</li></ul> 

                <button type="submit">Create Recipe</button>
                

            </form>
        </div>
    )
}

