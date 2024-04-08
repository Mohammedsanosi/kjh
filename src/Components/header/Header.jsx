import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./Navbar.css" ;
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoFileTrayStackedSharp } from "react-icons/io5";
import { IoMdContacts } from "react-icons/io";

export const Header = ({CurrentUser}) => {
  return(
    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} sticky="top" className="bg-body-tertiary mb-3 nav">
          <Container fluid className="nav">
            <a href="#." className="Main-title">hotel.ly</a>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} 
              style={{color:'#71CEEA'}}
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              
              placement="end"
              style={{backgroundColor:'#71CEEA'}}
            >
              <Offcanvas.Header closeButton variant='light' >
                <Offcanvas.Title className="title">
                  hotel.ly
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 p-3 icons">
                 <Link to="/reserv" className="a"><RiAccountCircleFill size={30} className="i"/>حسابي  </Link> 
                 <Link href="#" className="a"><IoFileTrayStackedSharp size={30} className="i"/>حجوزاتي </Link>
                 <Link href="#" className="a"><IoMdContacts size={30} className="i" />تواصل معنا </Link>
                 {
                 CurrentUser ? (
                 <div className="a" onClick={()=> auth.signOut()}>تسجيل خروج</div> )
                 :(
                 <Link to="/sign" className="a"> تسجيل دخول </Link>
       )}
                </Nav>
                
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;