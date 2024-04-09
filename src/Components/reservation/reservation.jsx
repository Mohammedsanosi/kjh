import React from "react";
import image7  from "../Images/image7.jpg" ;
import image5  from "../Images/image5.jpg" ;
import image4  from "../Images/image4.jpg" ;
import { Carousel,Modal } from 'react-bootstrap';
import Carddata from "../Data/data";
import "./reservation.css";
import { useState } from "react";
import { GiKnifeFork } from "react-icons/gi";
import { FaWifi,FaCar,FaSwimmingPool } from "react-icons/fa";

const Reserv =()=> {
    const [Cardd]=useState(Carddata) ;
    
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [selectedImage, setSelectedImage] = useState(null); // State to hold the selected image

    // Function to open the modal with the selected image
    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };
    return(
        <>
    
   <div className="body">
  
   <div className="top-container">
        <Carousel className="d-block"> {/* Show carousel only on small screens */}
          <Carousel.Item>
            <img className="top" src={image4} alt="First slide" onClick={() => handleImageClick(image4)} />
          </Carousel.Item>
          <Carousel.Item>
            <img className="top" src={image5} alt="Second slide" onClick={() => handleImageClick(image5)} />
          </Carousel.Item>
          <Carousel.Item>
            <img className="top" src={image7} alt="Third slide"  onClick={() => handleImageClick(image7)}/>
          </Carousel.Item>
        </Carousel>
       
      </div>
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

       <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Body style={{ padding: '0', margin: '0 auto'}}>
                    <img src={selectedImage} alt="Full view" style={{ width: '100%' }} />
                </Modal.Body>
            </Modal>
       </>
    )
}
export default Reserv ;