import React from "react";

export default function Card({img, name, type}){
    return(
        <div>
            <img src= {img} alt='img not found'></img>
            <h2>{name}</h2>
            {type?.map((e, index) => <h5 key={index}>{e.name}</h5>)}
        </div>
    );
}