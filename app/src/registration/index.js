import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import '../myCSS/signUp.css';
import emailjs from 'emailjs-com';
var valid = require('../../../server/validation/validation');

class Registration extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      FnameErr: '',
      LnameErr: '',
      emailErr: '',
      userError: '',
      PwdErr: ''
    }
  }

  SignInfoHandler =(event) => {
    let SignId = event.target.name;
    let SignVal = event.target.value;
    if (SignId === "firstName"){
        if (SignVal != '' && !valid.Validation.isValidFirstName(SignVal)) {
            this.setState({FnameErr: 'Must be 3 - 255 characters long'})
        }
        else {
            this.setState({FnameErr: ''})
            this.setState({[SignId]: SignVal});
        }
    } else if (SignId === "lastName"){
        if (SignVal != '' && !valid.Validation.isValidLastName(SignVal)) {
            this.setState({LnameErr: 'Must be 3 - 255 characters long'})
        }
        else {
            this.setState({LnameErr: ''});
            this.setState({[SignId]: SignVal});
        }
    } else if (SignId === "email"){
        if (SignVal != '' && !valid.Validation.isValidEmail(SignVal)) {
            this.setState({emailErr: 'Invalid email address'})
        }
        else {
            this.setState({emailErr: ''});
            this.setState({[SignId]: SignVal});
        }
    }
    else if (SignId === "username"){
        if (SignVal != '' && !valid.Validation.isValidUsername(SignVal)) {
            this.setState({userError: 'Username must  contain alphanumeric characters,one special character [_ . -] and should be 3 to 25 characters long'})
        }
        else {
            this.setState({userError: ''});
            this.setState({[SignId]: SignVal});
        }
    } else if (SignId === "password") {
        if (SignVal != '' && !valid.Validation.isValidPassword(SignVal)) {
            this.setState({PwdErr: 'Password must be at least 8 character, contain at least one lower-case letter, one upper-case letter, and one number'})
        }
        else {
            this.setState({PwdErr: ''});
            this.setState({[SignId]: SignVal});
        }
    }
}

  Emailer =(event) => {
    emailjs.sendForm(
      "matcha",
      " authentication",
      "SignCont",
      " user_MficxMpkaHDSEh7kxDkFN"
    )
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
    .catch((e) => {
      console.log(e.message || e);
      alert("Credential Errors. try again");
    });
  }

  render() {
    return (
      <div className="SignCont">
        <label className="SignSpan">First name:
          <input
            type='text'
            name="firstName"
            placeholder='First name'
            onChange={this.SignInfoHandler}
          /><div className="SignUpWarning">{this.state.FnameErr}</div>
        </label>
        <br />

        <label className="SignSpan">Last name:
          <input
            type='text'
            name="lastName"
            placeholder='Last name'
            onChange={this.SignInfoHandler}
          /><div className="SignUpWarning">{this.state.LnameErr}</div>
        </label>
        <br />

        <label className="SignSpan">Username:
          <input
            type='text'
            name="username"
            placeholder='Username'
            onChange={this.SignInfoHandler}
          /><div className="SignUpWarning">{this.state.userError}</div>
        </label>
        <br />

        <label className="SignSpan">Email             :
            <input
            type='email'
            name="email"
            placeholder='Email'
            onChange={this.SignInfoHandler}
          /><div className="SignUpWarning">{this.state.emailErr}</div>
        </label>
        <br />

        <label className="SignSpan">Password:
          <input
            type='password'
            name="password"
            placeholder='Password'
            onChange={this.SignInfoHandler}
          /><div className="SignUpWarning">{this.state.PwdErr}</div>
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