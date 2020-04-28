import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Navigation() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#Home">
                El Sandwicho
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#Home">Home</Nav.Link>
                    <Nav.Link href="#Menu">Menu</Nav.Link>
                    <Nav.Link href="#Status">Order Status</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation;