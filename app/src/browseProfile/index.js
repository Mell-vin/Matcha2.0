import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import '../myCSS/browseProf.css';

class BrowseProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      liked: false,
      matched: false,
      matchId: '',
      userId: '',
      firstName: '',
      lastName: '',
      username: '',
      gender: '',
      sexuality: '',
      biography: '',
      birthdate: '',
      mylocation: '',
      Vlat: '',
      Vlon: '',
      latitude: '',
      longitude: '',
      Dist: '',
    }
  }

  componentDidMount() {
    console.log('props', this.props.latitude);

    this.setState({
      Vlat: this.props.latitude,
      Vlon: this.props.longitude,
    });

    const { match: { params }} = this.props;

    this.setState({ userId: params.userId }, () => {
      this.getBlocked();
      this.getUserInfo();
      this.getProfileInfo();
      this.getLiked();
    });
    this.setState({Dist: this.distance(this.state.Vlat, this.state.Vlon, this.state.latitude, this.state.longitude, 'K')});
  }

  getBlocked = async () => {
    try {
      const res = await axios.get('http://localhost:3001/block?userId=' + this.state.userId);

      console.log('blocked:', res);
    } catch (e) { console.log(e.message || e); }
  }

  getUserInfo = async () => {
    try {
      const res = await axios.get('http://localhost:3001/user?userId=' + this.state.userId);

      this.setState({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        username: res.data.username,
      });
    } catch (e) { console.log(e.message || e); }
  }

  getProfileInfo = async () => {
    try {
      const res = await axios.get('http://localhost:3001/profile?userId=' + this.state.userId);

      if (res.status === 200) {
      this.setState({
        gender: res.data.gender,
        sexuality: res.data.sexuality,
        biography: res.data.biography,
        birthdate: res.data.birthdate,
        mylocation: res.data.mylocation,
        latitude: res.data.latitude,
        longitude: res.data.longitude,
      });
    }
    } catch (e) { console.log(e.message || e); }
  }

  distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
    }
  }

  getLiked = async () => {
    try {
      const res = await axios.get('http://localhost:3001/likes?userId=' + this.state.userId);

      if (res.status === 200) {
        this.setState({ liked: true });
        await this.getMatched();
      }
    } catch (e) { console.log(e.message || e); }
  }

  onLikeUser = async () => {
    try {
      const res = await axios.post('http://localhost:3001/like', { targetId: this.state.userId });

      if (res.status === 200) {
        this.setState({ liked: true });
        await this.getMatched();
      }
    } catch (e) { console.log(e.message || e); }
  }

  onUnlikeUser = async () => {
    try {
      const res = await axios.delete('http://localhost:3001/like', { data: { targetId: this.state.userId }});

      if (res.status == 200) {
        this.setState({
          liked: false,
          matched: false,
          matchId: '',
        });
      }
    } catch (e) { console.log(e.message || e); }
  }

  getMatched = async () => {
    try {
      const res = await axios.get('http://localhost:3001/match?userId=' + this.state.userId);

      if (res.status === 200) {
        this.setState({
          matchId: res.data.id,
          matched: true,
        });
      }
    } catch (e) { console.log(e.message || e); }
  }

  onBlockUser = async () => {
    try {
      const res = await axios.post('http://localhost:3001/block', { targetId: this.state.userId });

      if (res.status === 200) {
        this.props.history.push('/browse');
      }
    } catch (e) { console.log(e.message || e); }
  }

  render() {
    const {
      username,
      firstName,
      lastName,
      gender,
      sexuality,
      biography,
      birthdate,
      mylocation,
      Dist,
    } = this.state;

    return (
      <div className="browseProfcontainer">
        <span className="BrowseProfSpan">Username: {username}</span>
        <span className="BrowseProfSpan">First Name: {firstName}</span>
        <span className="BrowseProfSpan">Last Name: {lastName}</span>
        <span className="BrowseProfSpan">Gender: {gender}</span>
        <span className="BrowseProfSpan">Sexuality: {sexuality}</span>
        <span className="BrowseProfSpan">Biography: {biography}</span>
        <span className="BrowseProfSpan">My Location: {mylocation}</span>
        <span className="BrowseProfSpan">Distance: {Dist}</span>
        <span className="BrowseProfSpan">Birthdate: {birthdate.split('T')[0]}</span>
        {
          this.state.matched
          ? <button className="BrowseProfbutt" onClick={this.onUnlikeUser}>Unmatch</button>
          : this.state.liked
            ? <button className="BrowseProfbutt" onClick={this.onUnlikeUser}>Unlike</button>
            : <button className="BrowseProfbutt" onClick={this.onLikeUser}>Like</button>
        }
        {
          this.state.matched
          ? <Link
            to={{
              pathname: '/chat/' + this.state.matchId,
              state: { targetUsername: username },
            }}
          >
              <button className="BrowseProfbutt">Chat</button>
            </Link>
          : null
        }
        <button className="BrowseProfbutt" onClick={this.onBlockUser}>Block</button>
        <button className="BrowseProfbutt" onClick={this.onReportUser}>Report</button>
      </div>
    );
  }
}

export default withRouter(BrowseProfile);