import React from 'react';
import axios from 'axios';
import { strict } from 'assert';
import { withRouter, Link } from 'react-router-dom';
import '../myCSS/search.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AgeGap: '',
            Fame: '',
            interest_id: '',
            mylocation: '',
            sort: '',
            liked: false,
            matched: false,
            matchId: '',
            interests: [],
            suggestions: [],
        }
    }

    componentDidMount() {
      this.onGetInterests();
    }

    InterestSearch = (Iid) => {
      this.setState({interest_id: Iid});
    }

      getSugg = async () => {

        alert("params are: " + this.state.AgeGap + " " +  this.state.mylocation + " " +  this.state.interest_id + " " +  this.state.sort);
        if (this.state.AgeGap == '' || this.state.mylocation == '' || this.state.interest_id == ''|| this.state.sort == ''){
          alert("Fields cant be left empty");
      } else if (this.state.sort == 'date_part') {
          try {
              const res = await axios.get('http://localhost:3001/searchage?mylocation=' + this.state.mylocation + '&interest_id=' + this.state.interest_id + '&birthdate=' + this.state.AgeGap  );
        
              if (res.status === 200) {
                console.log('Response: date', res.data);
                this.setState({
                  suggestions: res.data
                });
              }
            } catch (e) {
              console.log("Sugg error " + e.message || e);
              this.props.history.push('/profile');
            }
      } else if (this.state.sort == 'interest_id') {
        try {
            const res = await axios.get('http://localhost:3001/searchbio?mylocation=' + this.state.mylocation + '&interest_id=' + this.state.interest_id + '&birthdate=' + this.state.AgeGap  );
      
            if (res.status === 200) {
              console.log('Response: bio', res.data);
              this.setState({
                suggestions: res.data
              });
            }
          } catch (e) {
            console.log("Sugg error " + e.message || e);
            this.props.history.push('/profile');
          }
    } else if (this.state.sort == 'mylocation') {
      try {
          const res = await axios.get('http://localhost:3001/searchlocat?mylocation=' + this.state.mylocation + '&interest_id=' + this.state.interest_id + '&birthdate=' + this.state.AgeGap  );
    
          if (res.status === 200) {
            console.log('Response: loc', res.data);
            this.setState({
              suggestions: res.data
            });
          }
        } catch (e) {
          console.log("Sugg error " + e.message || e);
          this.props.history.push('/profile');
        }
  }
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

    SearchHandler = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        if (name === "Fame") {
            if (!Number(val)) {
              alert("The fame must be a number");
            }
          } else if (name === "AgeGap") {
            if (!Number(val)) {
              alert("The age must be a number");
            }
          }
        this.setState({[name]: val});
    }

    onGetInterests = async () => {
      try {
        const res = await axios.get('http://localhost:3001/interests');
  
        if (res.status === 200) {
          this.setState({ interests: res.data });
        }
      } catch (e) { console.log(e.message || e); }
    }

    render () {
        const {
            suggestions,
            fame,
            interests,
          } = this.state;
        return (
            <div>
        <div className="BrowseContRight">
        <div className="BottomLeft">
                            <div className="BrowseSpan">
                                Age:
                            </div>
                            <div className="BrowseSpan">
                                Location:
                            </div>
                            <div className="BrowseSpan">
                                Interests:
                            </div>
                            <div className="BrowseSpan">
                                Sort by:
                            </div>
                            <button onClick={this.getSugg} className="Searchbutt" type="button">Search</button>
                        </div>
                            <div className="searchItemBlock">
                            <textarea type='text' name='AgeGap' onChange={this.SearchHandler} id="SearchItem"/>
                            <textarea type='text' name='mylocation' onChange={this.SearchHandler} id="SearchItem"/>
                            {
                                interests.length > 0 && interests.map((interest) => (
                                  <button className="Intbutt"
                                    key={interest.id}
                                    value={interest.id}
                                    onClick={() => this.InterestSearch(interest.id)}
                                  >
                                    {interest.interest}
                                  </button>
            ))
          }
                            <div>
                            <input className="searchradio" type='radio' name='sort' value="date_part" onChange={this.SearchHandler}/>
                                <label for="Age">Age</label>
                                <input className="searchradio" type='radio' name='sort' value="mylocation" onChange={this.SearchHandler}/>
                                <label for="Location">Location</label>
                                <input className="searchradio" type='radio' name='sort' value="interest_id" onChange={this.SearchHandler}/>
                                <label for="Interest">Intrst</label>
                            </div>
                            </div>
                        </div>
                        <div></div>
                       {
                           suggestions.map(
                           suggestion => <div className="browseProfcontainer">
                                <span className="searchSpan">Username: {suggestion.username}</span>
                                <span className="searchSpan">My Location: {suggestion.mylocation}</span>
                                <span className="searchSpan">Interests: {suggestion.interest}</span>
                                <span className="searchSpan">Birthdate: {suggestion.birthdate.split('T')[0]}</span>
                                <Link to={"/profile/" + suggestion.id} >
                                  <button className="BrowseProfbutt">View Profile</button>
                                </Link>
                          </div>
                           )
                       } 
            </div>
        )
    }
}

export default Search;