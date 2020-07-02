import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import header from '../myCSS/header.css';

class Header extends React.Component {

  isLoggedIn = () => (
    this.props.isAuthenticated
      ? (
        <div>
          <span className="welcome">Welcome, {this.props.firstName} {this.props.lastName}!</span>
          <div className="container">
          <Link to='/login'>
            <button className="butt" onClick={this.props.onUserLogout} >Log Out</button>
          </Link>
          <Link to='/profile'>
            <button className="butt" >Profile</button>
          </Link>
          <Link to='/browse'>
            <button className="butt">Browse</button>
          </Link>
          <Link to='/matches'>
            <button className="butt">Matches</button>
          </Link>
          </div>
        </div>
      )
      : (
        <span>Not logged in</span>
      )
  )

  render() {
    return (
      <div>
        {this.isLoggedIn()}
      </div>
    );
  }
}

export default withRouter(Header);