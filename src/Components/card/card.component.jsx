import React from "react";
import "./Card.css"
import { Link } from 'react-router-dom';


const Card =({image,Hotelname,content}) => {
    
    return(
        <div>
        <div className="Card"> 
        <img src={image} alt="hotels" className="Top-image"/>
            <div className="bottom" >
            <h1>{Hotelname}</h1>
            <p>{content}</p>
            <button className="btn2"> <Link to="/reserv" >حجز</Link></button>
            
             </div>
        </div>
        </div>
    
    )  
}
export default Card ;