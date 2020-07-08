import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import '../myCSS/login.css';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  onLogin = async () => {
    try {
      const res = await axios.post(
        'http://localhost:3001/login',
        {
          username: this.state.username,
          password: this.state.password,
        }
      );

      if (res.status === 200) {
        this.props.onUserLogin();
        this.props.history.push('/profile');
      }
    } catch (e) {
      console.log(e.message || e);
      alert("Credential error. Try again :(");
    }
  }

  render() {
    return (
      <div className="LoginCont">
        <label className="LoginSpan">Username:
          <input
            autofocus
            type='text'
            placeholder='Username'
            value={this.state.username}
            onChange={
              (event) => {
                this.setState({ username: event.target.value });
              }
            }
          />
        </label>
        <br />

        <label className="LoginSpan">Password:
          <input
            type='password'
            placeholder='Password'
            value={this.state.password}
            onChange={
              (event) => {
                this.setState({ password: event.target.value });
              }
            }
          />
        </label>
        <br />

        <button className="Loginbutt" onClick={this.onLogin}>Log In</button>
        <br />

        <Link to='/'>
          <button className="Loginbutt">Go back</button>
        </Link>
  <br />
  <Link to='././forgot_pass'>
          <button className="Loginbutt">Forgot Password?</button>
        </Link>
      </div>
    );
  }
}

export default withRouter(Login);