import React from "react";
import {Link} from 'react-router-dom'
import estilos from './LandingPage.module.css' 

export default function LandingPage(){
    return(
        <div className={estilos.contenedor}>
            <h1 className={estilos.titulo}>Universe of Recipes</h1>
            <Link to = '/home'>
                <button className={estilos.boton}>Home</button>
            </Link>
        </div>
    )
}