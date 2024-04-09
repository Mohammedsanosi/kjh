import React from "react";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram,FaWhatsapp } from "react-icons/fa";

 const Footer = () => {
    return(
        <div>
     <footer className="footer">
     <div className="footer-container">
    <p className="Copyrights">Copyrights@ Mohammed Alsanosi & Saleh Almahrsy</p>
    <br/>
    <div className="icons-container">
    <br/>
        <a href="https://www.facebook.com/profile.php?id=100017053807231&locale=ar_AR" className="footer-icons"><FaFacebook className="icona"/></a>
        <a href="#" className="footer-icons"><FaInstagram className="icona"/></a>
        <a href="#" className="footer-icons"><FaWhatsapp className="icona"/></a>
        
    </div> 
    </div>
     </footer>
     </div>
    ) 
}
export default Footer;
