import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {

  const [empId, setEmpId] = useState('');

  useEffect(() => {
    const sessionEmpId = sessionStorage.getItem('empId') || 'No empId available';
    setEmpId(sessionEmpId); // Setting empId to state so it triggers re-render
  }, []); // Empty dependency array ensures this runs once after initial render

  return (
    <div>
         <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand >ORKA Track</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/Home">Home</Nav.Link>
          
          <Nav.Link as={Link} to="/Leave">LeaveForm</Nav.Link>
          <Nav.Link as={Link} to="/writeTask">WriteTask</Nav.Link>
          <Nav.Link as={Link} to="/Task">TaskStataus</Nav.Link> 
          <p style={{color:'white',marginLeft:'721px'}} >{"userId:" +empId}</p> 
          <Nav.Link as={Link} to="/" style={{marginLeft:'80px'}}>Signout</Nav.Link>   
         
          </Nav>


          {/* <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> */}
        </Container>
        
      </Navbar>
      

    </div>
  )
}

export default HeaderComponent