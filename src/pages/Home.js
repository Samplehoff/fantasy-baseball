import React from 'react';
import './Home.css'
//import Form from 'react-bootstrap/Form'
//import Button from 'react-bootstrap/Button'
import Login from './Login'

class Home extends React.Component {
    render () {
        return (
            <div className="background-image">
                {/* <p>Fantasy Baseball Research</p>
                <p>Get and edge on the Competition!</p> */}
                <Login/>
            </div>    
        );
    }
}

export default Home;