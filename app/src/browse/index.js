import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import '../myCSS/browse.css';

class Browse extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      suggestions: []
    }
  }

  componentDidMount() {
    this.getSuggestedProfiles();
  }

  getSuggestedProfiles = async () => {
    try {
      const res = await axios.get('http://localhost:3001/suggestions');

      if (res.status === 200) {
        console.log('Response:', res.data);
        this.setState({
          suggestions: res.data
        });
      }
    } catch (e) {
      console.log(e.message || e);
      this.props.history.push('/profile');
    }
  }

  render() {
    const {
      suggestions
    } = this.state;

    return (
      <div className="BrowseCont">
        <h3>Suggestions</h3>
        {
          suggestions.map(
            suggestion => <div className="sugg" key={suggestion.username}>
              <span className="BrowseSpan">Firstname: {suggestion.firstName}</span>
              <span className="BrowseSpan">Lastname: {suggestion.lastName}</span>
              <span className="BrowseSpan">Username: {suggestion.username}</span>
              <span className="BrowseSpan">Gender: {suggestion.gender}</span>
              <span className="BrowseSpan">Sexuality: {suggestion.sexuality}</span>
              <Link to={"/profile/" + suggestion.userId} >
                <button className="BrowseProfbutt">View Profile</button>
              </Link>
              <br />
            </div>
          )
        }
      </div>
    );
  }
}

export default withRouter(Browse);