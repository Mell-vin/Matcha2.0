import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import '../myCSS/signUp.css';

class Registration extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    }
  }

  onRegister = () => {
    axios.post(
      'http://localhost:3001/registration',
      {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
    )
    .then((res) => {
      if (res.status === 201)
        this.props.history.push('/login');
    })
    .catch((e) => { console.log(e.message || e); });
  }

  render() {
    return (
      <div className="SignCont">
        <label className="SignSpan">First name:
          <input
            type='text'
            placeholder='First name'
            value={this.state.firstName}
            onChange={
              (event) => {
                this.setState({ firstName: event.target.value });
              }
            }
          />
        </label>
        <br />

        <label className="SignSpan">Last name:
          <input
            type='text'
            placeholder='Last name'
            value={this.state.lastName}
            onChange={
              (event) => {
                this.setState({ lastName: event.target.value });
              }
            }
          />
        </label>
        <br />

        <label className="SignSpan">Username:
          <input
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

        <label className="SignSpan">Email             :
            <input
            type='email'
            placeholder='Email'
            value={this.state.email}
            onChange={
              (event) => {
                this.setState({ email: event.target.value });
              }
            }
          />
        </label>
        <br />

        <label className="SignSpan">Password:
          <input
            type='password'
            placeholder='Password'
            value={this.state.value}
            onChange={
              (event) => {
                this.setState({ password: event.target.value });
              }
            }
          />
        </label>
        <br />

        <button className="Signbutt" onClick={this.onRegister}>Register</button>
        <br />

        <Link to='/'>
          <button className="Signbutt">Go Back</button>
        </Link>
      </div>
    );
  }
}

export default withRouter(Registration);