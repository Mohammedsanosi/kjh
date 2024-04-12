import React, { useState, useEffect } from 'react';
import { Carousel, Modal } from 'react-bootstrap';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.utils';
import { useLocation ,useNavigate} from 'react-router-dom'; // Import useLocation
import { GiKnifeFork } from 'react-icons/gi';
import { FaWifi, FaCar, FaSwimmingPool } from 'react-icons/fa';
import './reservation.css';

const Details = () => {

  const [card, setCard] = useState(null); // Change to store a single card
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation(); // Get the location object
  const navigate = useNavigate() ;


  useEffect(() => {
    const fetchCard = async () => {
      const cardId = location.state?.cardId; // Access the cardId from the state
      if (cardId) {
        const docRef = doc(db, 'cards', cardId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCard({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('No such document!');
        }
      }
    };
    fetchCard();
  }, [location.state?.cardId]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const { hotelName } = location.state;

  const handleClickNav =() => {
    navigate('/reserv', { state: { hotelName} });
  }

  return (
    <>
      {card && (
        <div className="body">
          <div className="top-container">
            <Carousel className="d-block">
              {card.imageUrl.map((url, index) => (
                <Carousel.Item key={index}>
                  <img className="top" src={url} alt={`Slide ${index + 1}`} onClick={() => handleImageClick(url)} />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className="middle">
            <h1>{card.name}</h1>
            <button className="btn" onClick={handleClickNav}>حجز</button>
          </div>
          <hr />

          <div className="features">
            <h2>واي فاي</h2>
            <h2>مسبح</h2>
            <h2>مواقف</h2>
            <h2>افطار</h2>
          </div>
          <div className="features">
            <FaWifi />
            <FaSwimmingPool />
            <FaCar />
            <GiKnifeFork />
          </div>
          <div className="describtion">
            <h1>{card.name}</h1>
            <h3>{card.location}</h3>
            <p>{card.describtion}</p>
          </div>
        </div>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Body style={{ padding: '0', margin: '0 auto' }}>
          <img src={selectedImage} alt="Full view" style={{ width: '100%' }} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Details;
