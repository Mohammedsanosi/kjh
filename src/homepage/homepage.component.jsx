import React from "react"; 
import CreateCard from "../Components/card/Cardmap";
import Footer from "../Components/footer/Footer" ;

import "../Components/card/Card.css" ;
import Header from "../Components/header/Header";


const Homepage = ({CurrentUser}) => {
return(
 <div>
 <Header CurrentUser={CurrentUser}/>
<CreateCard />

    <Footer />
 </div>
)
}
export default Homepage ;