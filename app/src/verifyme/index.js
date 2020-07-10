import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import '../myCSS/login.css';

class Verifyme extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        username: '',
      }
    }

  onLoad = async () => {
    const queryString = window.location.search;
    // console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    // console.log(urlParams);
    const verifytoken = urlParams.get('token')
    // console.log(verifytoken);
    this.setState({username: verifytoken});
    try {
      const res = await axios.post(
        'http://localhost:3001/verifyme',
        {
            username: this.state.username,
        }
      );

      if (res.status === 200) {
        this.props.history.push('/login');
      }
    } catch (err) { console.error(err.message || err); }
  }

  render() {
    return (
      <div className="LoginCont">


        {/* <Link to='/login'> */}
          <button className="Loginbutt" onClick={this.onLoad}>Log In</button>
        {/* </Link> */}
      </div>
    );
  }
}

export default withRouter(Verifyme);