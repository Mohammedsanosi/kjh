import React from "react"; 
import CreateCard from "../Components/card/Cardmap";
import Footer from "../Components/footer/Footer" ;


import "../Components/card/Card.css" ;



const Homepage = ({CurrentUser}) => {
return(
 <div>
 
<CreateCard />

    <Footer />
 </div>
)
}
export default Homepage ;