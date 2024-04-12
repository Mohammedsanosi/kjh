import React from "react";

import "./Card.css" ;
import { useState ,useEffect} from "react";
import Card from "./card.component";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebase/firebase.utils";
import { IoSearch } from "react-icons/io5";



const CreateCard =() => {
    
    const [cards, setCards] = useState([]);
     const [Searchfield,setSearchfield]= useState("") ;

     useEffect(() => {
        const fetchCards = async () => {
          const querySnapshot = await getDocs(collection(db, 'cards'));
          const cardData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCards(cardData);
        };
        fetchCards();
    }, []);

    const filteredHotels= cards.filter(cards=>
        cards.name.toLowerCase().includes(Searchfield.toLowerCase()))
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
                {filteredHotels.map(cards => (
                    <Card id={cards.id} Hotelname={cards.name} location={cards.location} image={cards.imageUrl} />
                ))}
            </div>
            </>
    )
}
export default CreateCard ;


 