import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';

export default function  NavBar (props: any) {
  
  const navigate = useNavigate()

  // console.log(props)
  const [isOpen, setIsOpen] = useState(false);
  // const user = useSelector((state: any) => state.auth.user)
  // console.log(user)
  const toggle = () => setIsOpen(!isOpen);



  return (
    <div className='navbar-div'>
      <Navbar dark color='dark' expand='md' container='fluid' fixed='top' id="navbar">
        <NavbarBrand>Iron Vault</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink className='nav-link' to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/profile" className='nav-link'>Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/messages" className='nav-link'>Messages</NavLink>
            </NavItem>
          </Nav>
          <div className='login-logout-link'>
            { props.isLoggedIn ? <button onClick={props.handleLogout}>Logout</button> : <button onClick={() => navigate('/auth/login')}>Login</button>}
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}
