import React from 'react';
import { useLocation } from 'react-router-dom';
import "./reservation.css" ;
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Invoice = () => {
    const location = useLocation();
    const { reservationData} = location.state;  // Retrieving data from the navigation state

    const getNumberOfDays = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = Math.abs(endDate - startDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    };

    // Calculate the number of days
    const days = getNumberOfDays(reservationData.arrivalDate, reservationData.departureDate);

    // Calculate total price considering the number of days
    const totalPrice = reservationData.roomTypes.reduce((acc, room) => acc + (room.count * room.price * days), 0);

    const printDocument = () => {
        const input = document.getElementById('invoice');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save("invoice.pdf");
            });
    };

    return (
        <div className="invoice" id='invoice'>
            <h1 className='head'>الفاتورة</h1>
            <p> {reservationData.hotelName} <strong> : اسم الفندق </strong></p>
            <p> {reservationData.ReservName} <strong> : اسم العميل</strong></p>
            <p> {reservationData.arrivalDate} <strong> : تاريخ الوصول</strong></p>
            <p> {reservationData.departureDate} <strong>: تاريخ المغادرة</strong></p>
            <p> {reservationData.numberOfMembers} <strong> : عدد الأفراد</strong></p>
            <div className='detail'>
                <h1 className='room-details'>تفاصيل الغرف</h1>
                {reservationData.roomTypes.map((room, index) => (
                    <p key={index}>
                        {room.type}  -  العدد : {room.count} - السعر للغرفة: {room.price} - 
                        السعر الإجمالي للغرفة لكل الأيام : {room.count * room.price * days}
                    </p>
                ))}
            </div>
            <p><strong>عدد الأيام :</strong> {days}</p>
            <p><strong>المبلغ الإجمالي :</strong> {totalPrice}</p>

            <button onClick={printDocument} className='pdf-button'>Download PDF</button>
        </div>
    );
};

export default Invoice;