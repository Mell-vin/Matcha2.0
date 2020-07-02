import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../myCSS/profile.css';
import '../myCSS/header.css';

class UserProfile extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      interests: [],
      userInterests: [],
    };
  }

  componentDidMount() {
    this.onGetInterests();
    this.onGetUserInterests();
  }

  onGetInterests = async () => {
    try {
      const res = await axios.get('http://localhost:3001/interests');

      if (res.status === 200) {
        this.setState({ interests: res.data });
      }
    } catch (e) { console.log(e.message || e); }
  }

  onGetUserInterests = async () => {
    try {
      const res = await axios.get('http://localhost:3001/user-interests');

      if (res.status === 200) {
        this.setState({ userInterests: res.data });
      }
    } catch (e) { console.log(e.message || e); }
  }

  render() {
    console.log('[UserProfile]', this.state);
    const {
      username,
      firstName,
      lastName,
      email,
      gender,
      sexuality,
      biography,
      birthdate,
    } = this.props;

    const {
      interests,
      userInterests,
    } = this.state;

    return (
      <div>
        <br />
        <h1>My Profile</h1>
        <div className="mainCont">
        <div className="Profcontainer">

        <span className="spanC">Username: {username}</span>

        <span className="spanC">First Name: {firstName}</span>

        <span className="spanC">Last Name: {lastName}</span>

        <span className="spanC">Email: {email}</span>

        <span className="spanC">Gender: {gender}</span>

        <span className="spanC">Sexuality: {sexuality}</span>

        <span className="spanC">Biography: {biography}</span>

        <span className="spanC">Birthdate: {birthdate.split('T')[0]}</span>

        <label className="spanC">
          Interests:
          {
            interests.length > 0 && userInterests.length > 0 && userInterests.map((interest) => (
                <span key={interest.interest_id}>{interests[interest.interest_id - 1].interest}</span>
            ))
          }
        </label>

        <Link to="edit-profile">
          <button className="Profbutt">Edit</button>
        </Link>
        </div>
        <span className="imageCont">
          {
            // list images
          }
        </span>
        </div>
      </div>
    );
  }
}

export default UserProfile;