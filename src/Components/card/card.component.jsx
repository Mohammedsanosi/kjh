import React from "react";
import "./Card.css"
import {useNavigate} from 'react-router-dom';


const Card =({image,Hotelname,content}) => {
    const navigate = useNavigate() ;
    return(
        <div>
        <div className="Card"> 
        <img src={image} alt="hotels" className="Top-image"/>
            <div className="bottom" >
            <h1>{Hotelname}</h1>
            <p>{content}</p>
            <button className="btn2" onClick={()=> navigate('/reserv')}>التفاصيل</button>
            
             </div>
        </div>
        </div>
    
    )  
}
export default Card ;