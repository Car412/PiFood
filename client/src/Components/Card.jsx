import React from "react";
import estilos from './Card.module.css'

export default function Card({img, name, diets}){
    return(
        <div className={estilos.contenedor}>
            <h2 className={estilos.titulo}>{name}</h2>
            {diets?.map(e=> <h4 className={estilos.h4} key={e.name}>{e.name}</h4>)}
            <img className={estilos.img}src= {img} alt='img not found'></img>                        
            
        </div>
    );
}