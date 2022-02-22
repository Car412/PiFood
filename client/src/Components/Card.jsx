import React from "react";

export default function Card({img, name, diets}){
    return(
        <div>
            <h2>{name}</h2>
            <img src= {img} alt='img not found'></img>                        
            {diets?.map((e, index) => <h5 key={index}>{e.name}</h5>)}
        </div>
    );
}