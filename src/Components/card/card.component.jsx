import React from "react";
import "./Card.css"
import {useNavigate} from 'react-router-dom';


const Card =({image,Hotelname,location,id}) => {
    const navigate = useNavigate() ;
    const handleNavigate = () => {
        navigate('/details', { state: { cardId: id , hotelName: Hotelname } }); // Pass the card ID in the state
    };
    return(
        <div>
        <div className="Card"> 
        <img src={image} alt="hotels" className="Top-image"/>
            <div className="bottom" >
            <h1>{Hotelname}</h1>
             <p>{location}</p>
            <button className="btn2" onClick={handleNavigate}>التفاصيل</button>
            
             </div>
        </div>
        </div>
    
    )  
}
export default Card ;