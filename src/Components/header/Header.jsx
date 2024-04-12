import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./Navbar.css" ;
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import { RiAccountCircleFill } from "react-icons/ri";

import { IoMdContacts } from "react-icons/io";
import { TbLogout2,TbLogin2  } from "react-icons/tb";

export const Header = ({CurrentUser}) => {

  return(
    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} sticky="top" className="bg-body-tertiary mb-3 nav">
          <Container fluid className="nav">
            <Link to="/" className="Main-title">hotel.ly</Link>
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
                 <Link href="#" className="a"> <IoMdContacts  className="i" />تواصل معنا </Link>
                 <Link to="/my-account" className="a"><RiAccountCircleFill  className="i"/> حسابي </Link>
                 { 
                 CurrentUser ? (
                 <div className="a" onClick={()=>{ auth.signOut() ;}}> <TbLogout2 className="i"/>تسجيل خروج</div> )
                 :(
                 <Link to="/" className="a">  <TbLogin2 className="i"/> تسجيل دخول </Link>
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