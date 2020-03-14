import React from 'react';
import {Navbar, Nav} from 'react-bootstrap'
//import Login from './pages/Login'
//import './Header.css';

class Header extends React.Component {
    render() { 
        return (
                <div>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="/">Fantasy Research</Navbar.Brand>
                            <Nav className="mr-auto">
                                <Nav.Link href="/stats">2019 Stats</Nav.Link>
                                <Nav.Link href="/projections">2020 Projections</Nav.Link>
                                <Nav.Link href="/adp">Draft</Nav.Link>
                                <Nav.Link href="/teams">Teams</Nav.Link>
                                
                            </Nav>
                            
                            {/* <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button variant="outline-info">Search</Button>
                            </Form> */}
                    </Navbar>
                </div>
        )}
}

export default Header;