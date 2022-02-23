import React from "react";
import estilos from './Card.module.css'

export default function Card({img, name, diets}){
    return(
        <div className={estilos.contenedor}>
            <h2 className={estilos.titulo}>{name}</h2>
            <img className={estilos.img}src= {img} alt='img not found'></img>                        
            <ul className={estilos.ul}>{diets?.map((e, index) => <li key={index}>{e.name}</li>)}</ul>
        </div>
    );
}