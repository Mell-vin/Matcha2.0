import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {geolocated} from 'react-geolocated';
import '../myCSS/profile.css';
import '../myCSS/header.css';

class UserProfile extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      interests: [],
      userInterests: [],
      images: ['','','','',''],
      profImage: '',
      latitude: null,
      longitude: null,
      CurrSpot: null,
      APIKey: 'AIzaSyACQYSgZwbmC1Pz0GN7IOts68IgpyrNsl4'
    }; {/* AIzaSyDJQg9ozsmNdLTSnZypV85Id53WB4ceCPc */}
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.getUserAddress = this.getUserAddress.bind(this);
  }

  getLocation () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
    } else {
      alert("This broswer doesnt support Geolocation :(");
    }
  }

  getUserAddress () {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.state.latitude + ',' + this.state.longitude + '&sensor=false&key=' + this.state.APIKey)
    .then(response => response.json())
    .then(data => this.setState({
      CurrSpot: data.results[5].formatted_address
    }))
    .catch(error => alert(error))
  }

  getCoordinates (position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    this.getUserAddress()
  }

  handleLocationError (error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied permission to use location");
        break;
      case error.POSITION-UNAVAILABLE:
        alert("Location info is unavailable");
        break;
      case error.TIMEOUT:
        alert("the request timed out");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred");
        break;
      default:
        alert("An unknown error occurred");
    }
  }

  onGetImages = async () => {
    try {
      const res = await axios.get('http://localhost:3001/user-images');

      this.setState({ images: res.data.images });
    } catch (e) { console.log(e.message || e); }
  }

  componentDidMount() {
    this.onGetInterests();
    this.onGetUserInterests();
    this.onGetImages();
    this.getLocation();
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
    const {
      username,
      firstName,
      lastName,
      email,
      gender,
      sexuality,
      biography,
      birthdate,
      CurrSpot,
    } = this.props;

    const {
      interests,
      userInterests,
      images
    } = this.state;

    return (

      <div>
        <br />
        <h1>My Profile</h1>
        <div className="mainCont">
        <div className="Profcontainer">
        <div>
        {
          images[0] && <img src={'data:image/jpeg;base64,' + images[0].replace('\n', '')} />
        }
        </div>
        <span className="spanC">Username: {username}</span>

        <span className="spanC">First Name: {firstName}</span>

        <span className="spanC">Last Name: {lastName}</span>

        <span className="spanC">Email: {email}</span>

        <span className="spanC">Gender: {gender}</span>

        <span className="spanC">Sexuality: {sexuality}</span>

        <span className="spanC">Biography: {biography}</span>

        <span className="spanC">Curr Location: {this.state.CurrSpot}</span>

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
          <div>
            {
          images.length > 0 && images.map((image, index) => 
            <React.Fragment key={index} >
              <img src={'data:image/jpeg;base64,' + image.replace('\n', '')} />
              <button type="button">Delete</button>
              <br />
            </React.Fragment>
          )
        }
        </div>
        </span>
        </div>
      </div>
    );
  }
}

export default UserProfile;