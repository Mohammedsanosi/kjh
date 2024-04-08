import React from "react";
import image7  from "../Images/image7.jpg" ;
import Carddata from "../Data/data";
import "./reservation.css";
import { useState } from "react";
import { GiKnifeFork } from "react-icons/gi";
import { FaWifi,FaCar,FaSwimmingPool } from "react-icons/fa";

const Reserv =()=> {
    const [Cardd]=useState(Carddata) ;
    
    return(
        <>
    
   <div className="body">
   <img src={image7} alt="hotel" className="top" />
   <div className="middle">
   <h1>{Cardd[3].name}</h1>
   <button className="btn" >حجز</button>
   
   </div>
   <hr />
   <div className="features">
  <h2> واي فاي</h2>
    <h2>مسبح</h2>
   <h2>مواقف</h2>
   <h2>افطار</h2>
   </div>
   <div className="features">
   <FaWifi />
   <FaSwimmingPool/>
   <FaCar />
   <GiKnifeFork/>
   </div>

   <div className="describtion">
    <h1>{Cardd[3].name}</h1>
    <h3>{Cardd[3].location}</h3>
    <p>{Cardd[3].describtion}</p>
   </div>
   
       
       </div>
       </>
    )
}
export default Reserv ;