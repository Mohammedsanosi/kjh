import React, { useState } from "react";
import {useNavigate,useLocation} from "react-router-dom" ;
import { Form } from 'react-bootstrap';
import { db } from '../../firebase/firebase.utils'
import { collection, addDoc } from 'firebase/firestore';
import './reservation.css';

const Reserv = () => {
    const [ReservName, setReservName] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [numberOfMembers, setNumberOfMembers] = useState(1);
    const [roomTypes, setRoomTypes] = useState([
        { type: "غرفة مفردة", count: 0 , price :100},
        { type: "غرفة زوجية", count: 0 ,price:150},
        { type: "غرفة ثلاثية", count: 0 ,price:200}
      ]);
      const location = useLocation();
const [hotelName] = useState(location.state.hotelName);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const reservationData = {
            arrivalDate,
            departureDate,
            numberOfMembers,
            roomTypes,
            ReservName,
            hotelName,
          };console.log(hotelName)
          try {
            await addDoc(collection(db, 'reservations'), reservationData);
            navigate('/invoice' , {state :{reservationData}}); // passing data to invoce page
          } catch (error) {
            console.error("Error adding document: ", error);
          }
      };

      const handleRoomCountChange = (index, value) => {
        const newRoomTypes = [...roomTypes];
        newRoomTypes[index].count = Number(value);
        setRoomTypes(newRoomTypes);
      };

      const calculateTotalPrice = () => {
        if (!arrivalDate || !departureDate || new Date(departureDate) <= new Date(arrivalDate)) {
            return 0;
        }
        const days = getNumberOfDays(arrivalDate, departureDate);
        return roomTypes.reduce((total, room) => {
            return total + (room.count * room.price * days);
        }, 0);
    };

    const getNumberOfDays = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        return (endDate - startDate) / (1000 * 60 * 60 * 24);
    };

    return(
        <Form onSubmit={handleSubmit} className="form">
<h1>{hotelName.name}</h1>
<div className="form-group">
          <label className="form-label">اسم العميل </label>
          <input
            type="text"
            value={ReservName}
            onChange={(e) => setReservName(e.target.value)}
            className="form-control-custom"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">تاريخ الوصول</label>
          <input
            type="date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            className="form-control-custom"
            required
          />
        </div>
      
        <div className="form-group">
          <label className="form-label">تاريخ المغادرة</label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="form-control-custom"
            required
          />
        </div>
      
        <div className="form-group">
          <label className="form-label">عدد الأفراد</label>
          <input
            type="number"
            value={numberOfMembers}
            onChange={(e) => setNumberOfMembers(e.target.value)}
            min="1"
            className="form-control-custom"
            required
          />
        </div>
      
        <div>
        {roomTypes.map((room, index) => (
            <div className="form-group" key={index}>
                <label className="form-label">{room.type} ({room.price} دينار لليلة الواحدة)</label>
                <input
                    type="number"
                    value={room.count}
                    onChange={(e) => handleRoomCountChange(index, e.target.value)}
                    min="0"
                    className="form-control-custom"
                    placeholder="عدد الغرف"
                    required
                />
            </div>
        ))}
        <p>Total Price: {calculateTotalPrice()} دينار</p>
    </div>
      
        <button type="submit" className="confirm-btn">
          تأكيد
        </button>
      </Form>

      
    );
  };
  
  export default Reserv;


