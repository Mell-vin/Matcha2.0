import React from 'react';
import { Link } from 'react-router-dom';
import '../myCSS/home.css';

class Home extends React.Component {
  render() {
    return (
      <div>
      <div className="SignCont">
        <h1 className="HomeSpan">Welcome to Matcha</h1>
        <Link to='/login'>
          <button className="Homebutt">Log In</button>
        </Link>
        <Link to='/registration'>
          <button className="Homebutt">Sign Up</button>
        </Link>
      </div>
      </div>
    );
  }
}

export default Home;