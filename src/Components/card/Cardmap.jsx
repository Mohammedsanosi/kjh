import React from "react";
import Carddata from "../Data/data";
import "./Card.css" ;
import { useState } from "react";
import Card from "./card.component";
import { IoSearch } from "react-icons/io5";



const CreateCard =() => {
    const [Cardd] =useState(Carddata) ;
     const [Searchfield,setSearchfield]= useState("") ;
    const filteredHotels= Cardd.filter(Cardd=>
        Cardd.name.toLowerCase().includes(Searchfield.toLowerCase()))
    return(
        <>
            <div className="Search-container">
                <div className="wrap">
                    <input
                        type="text"
                         placeholder="ابحث عن فندقك"
                        className="search-box"
                        onChange={e=>{setSearchfield(e.target.value);}
                        }/>
                   <IoSearch className="icon"/>
                </div>
            </div>
        
        <div className="container-card">
                {filteredHotels.map(Cardd => (
                    <Card key={Cardd.id} Hotelname={Cardd.name} content={Cardd.describtion} image={Cardd.image} />
                ))}
            </div>
            </>
    )
}
export default CreateCard ;


 