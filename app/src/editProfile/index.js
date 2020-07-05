import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../myCSS/editProf.css';

class EditProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      genderId: NaN,
      sexualityId: NaN,
      genders: [],
      sexualities: [],
      latitude: '',
      longitude: '',
      mylocation: 'HDN',
      APIKey: 'AIzaSyDJQg9ozsmNdLTSnZypV85Id53WB4ceCPc'
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.getUserAddress = this.getUserAddress.bind(this);
    this.UseCurr = this.UseCurr.bind(this);
  }

  UseCurr () {
    this.getUserAddress();
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
      mylocation: data.results[5].formatted_address
    }))
    .catch(error => alert(error))
  }

  getCoordinates (position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }

  componentDidMount() {
    this.setState({
      username: this.props.username,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      genderId: this.props.genderId,
      sexualityId: this.props.sexualityId,
      biography: this.props.biography,
      birthdate: this.props.birthdate.split('T')[0],
      mylocation: this.props.mylocation,
    });

    this.onGetGenders();
    this.onGetSexualities();
    this.getLocation();
  }

  onGetGenders = async () => {
    try {
      const res = await axios.get('http://localhost:3001/genders');

      if (res.status === 200 && res.data.length != 0) {
        this.setState({ genders: res.data });
      }
    } catch (e) { console.log(e.message || e); }
  }

  onGetSexualities = async () => {
    try {
      const res = await axios.get('http://localhost:3001/sexualities');

      if (res.status === 200 && res.data.length != 0) {
        this.setState({ sexualities: res.data });
      }
    } catch (e) { console.log(e.message || e); }
  }

  onSaveChanges = async () => {
    // TODO: Validation

    await this.onSaveUserInfo();
    await this.onSaveProfileInfo();
  }

  onSaveUserInfo = async () => {
    try {
      await axios.put(
        'http://localhost:3001/user',
        {
          username: this.state.username,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
        }
      );

      this.props.onSetUserInfo({
        username: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      })
    } catch (e) { console.log(e.message || e); }
  }

  onSaveProfileInfo = async () => {
    this.getLocation();
    try {
      await axios.put(
        'http://localhost:3001/profile',
        {
          gender_id: this.state.genderId,
          sexuality_id: this.state.sexualityId,
          biography: this.state.biography,
          birthdate: this.state.birthdate,
          mylocation: this.state.mylocation,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        }
      );

      this.props.onSetProfileInfo({
        gender_id: this.state.genderId,
        sexuality_id: this.state.sexualityId,
        gender: this.state.genders[this.state.genderId - 1].gender,
        sexuality: this.state.sexualities[this.state.sexualityId - 1].sexuality,
        biography: this.state.biography,
        birthdate: this.state.birthdate,
        mylocation: this.state.mylocation,
      });
  
    } catch (e) { console.log(e.message || e); }
  }

  render() {
    const {
      username,
      firstName,
      lastName,
      genderId,
      sexualityId,
      biography,
      birthdate,
      genders,
      sexualities,
      mylocation,
    } = this.state;

    return (
      <div className="editProfCont">
        <label className="EditProfSpan">
          Username  :
          <input
            type='text'
            value={username}
            onChange={(event) => { this.setState({ username: event.target.value }); }}
          ></input>
        </label>

        <label className="EditProfSpan">
          First Name  :  
          <input
            type='text'
            value={firstName}
            onChange={(event) => { this.setState({ firstName: event.target.value }); }}
          ></input>
        </label>

        <label className="EditProfSpan">
          Last Name  :  
          <input
            type='text'
            value={lastName}
            onChange={(event) => { this.setState({ lastName: event.target.value }); }}
          ></input>
        </label>

        <label className="EditProfSpan">
          mylocation  :
          <input
            type='text'
            value={mylocation}
            onChange={(event) => { this.setState({ mylocation: event.target.value }); }}
          ></input>
          <button className="LocButt" type="button" onClick={this.UseCurr}>Use Current Loc</button>
        </label>

        <label className="EditProfSpan">
          Gender  :
          {
            genders.length && genders.map((value, index) => (
              <label key={index}>
                {value.gender}
                <input
                  type='radio'
                  checked={genderId === value.id}
                  onChange={() => { this.setState({ genderId: value.id }); }}
                ></input>
              </label>
            ))
          }
        </label>

        <label className="EditProfSpan">
          Sexuality  :
          {
            sexualities && sexualities.map((value, index) => (
              <label key={index}>
                {value.sexuality}
                <input
                  type='radio'
                  checked={sexualityId === value.id}
                  onChange={() => { this.setState({ sexualityId: value.id }); }}
                ></input>
              </label>
            ))
          }
        </label>

        <label className="EditProfSpan">
          Biography  :
          <textarea
            value={biography || ""}
            onChange={(event) => { this.setState({ biography: event.target.value }); }}
          ></textarea>
        </label>

        <label className="EditProfSpan">
          Birthdate  :
          <input
            type="date"
            value={birthdate || ""}
            onChange={(event) => { this.setState({ birthdate: event.target.value }); }}
          />
        </label>

        <button className="EditProfbutt" onClick={this.onSaveChanges}>Save Changes</button>

        <Link to="/change-email">
          <button className="EditProfbutt">Change Email</button>
        </Link>

        <Link to="/password">
          <button className="EditProfbutt">Change Password</button>
        </Link>

        <Link to="/edit-interests">
          <button className="EditProfbutt">Edit Interests</button>
        </Link>

        <Link to="/edit-images">
          <button className="EditProfbutt">Edit Images</button>
        </Link>
      </div>
    );
  }
}

export default EditProfile;