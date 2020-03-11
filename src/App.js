import React from 'react';

import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Stats from './pages/Stats'
import Projections from './pages/Projections'
import Adp from './pages/Adp'
import Teams from './pages/Teams'
import Stadiums from './pages/Stadiums'
//import Navbar from 'react-bootstrap/Navbar';
import Footer from './Footer';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route  exact path="/" component={Home} />
      <Route  exact path="/stats" component={Stats} />
      <Route  exact path='/projections' component={Projections}/>
      <Route  exact path="/adp" component={Adp} />
      <Route  exact path='/teams' component={Teams}/>
      <Route  exact path="/stadiums" component={Stadiums} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
