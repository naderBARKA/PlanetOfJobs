import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './Navbar.css'
import { Navbar, Nav } from 'react-bootstrap';

export default class NavBar extends Component {
    render() {
        return (
            <Navbar  className="Nav " >
                <Navbar.Brand href="/" className="title"><b> <h2 style={{color:"white"}}>Planet Of Jobs</h2> </b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav  className="mr-auto">
                        <Nav.Link href="/" className='home'><h6 style={{color:"white"}}>Home</h6></Nav.Link>
                        <Nav.Link href="/profile" className="profile"> <h6 style={{color:"white"}}>Profile</h6></Nav.Link>
                        <Nav.Link href="/dashboard" className="dash"><h6 style={{color:"white"}}>Dashboared</h6></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
             
            </Navbar>
        )
    }
}