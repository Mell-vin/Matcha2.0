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
            biography: '',
            mylocation: '',
            sort: '',
            liked: false,
            matched: false,
            matchId: '',
            suggestions: [],
        }
    }

    getBlocked = async (Uid) => {
        try {
          const res = await axios.get('http://localhost:3001/block?userId=' + Uid);
    
          if (res.status === 200){
            console.log('blocked:', res);
          }
        } catch (e) { console.log(e.message || e); }
      }
    
      getLiked = async (Uid) => {
        try {
          const res = await axios.get('http://localhost:3001/likes?userId=' + Uid);
    
          if (res.status === 200) {
            this.setState({ liked: true });
            await this.getMatched();
          }
        } catch (e) { console.log(e.message || e); }
      }
    
      onLikeUser = async (Uid) => {
        try {
          const res = await axios.post('http://localhost:3001/like', { targetId: Uid });
    
          if (res.status === 200) {
            this.setState({ liked: true });
            await this.getMatched();
          }
        } catch (e) { console.log(e.message || e); }
        try {
          const res = await axios.get('http://localhost:3001/fame?userId=' + Uid);
    
          if (res.status === 200) {
            console.log("mxm :" + res.data.count);
            this.setState({fame: res.data.count});
          }
        } catch (e) {
          console.log("at here " + e.message || e);
        }
      }
    
      onUnlikeUser = async (Uid) => {
        try {
          const res = await axios.delete('http://localhost:3001/like', { data: { targetId: Uid }});
    
          if (res.status == 200) {
            this.setState({
              liked: false,
              matched: false,
              matchId: '',
            });
          }
        } catch (e) { console.log(e.message || e); }
        try {
          const res = await axios.get('http://localhost:3001/fame?userId=' + this.state.userId);
    
          if (res.status === 200) {
            console.log("mxm :" + res.data.count);
            this.setState({fame: res.data.count});
          }
        } catch (e) {
          console.log("at here " + e.message || e);
        }
      }

      getSugg = async () => {

        if (this.state.AgeGap == '' || this.state.mylocation == '' || this.state.biography == ''|| this.state.sort == ''){
          alert("Fields cant be left empty");
      } else if (this.state.sort == 'date_part') {
          try {
              const res = await axios.get('http://localhost:3001/searchage?mylocation=' + this.state.mylocation + '&biography=' + this.state.biography + '&birthdate=' + this.state.AgeGap  );
        
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
      } else if (this.state.sort == 'biography') {
        try {
            const res = await axios.get('http://localhost:3001/searchbio?mylocation=' + this.state.mylocation + '&biography=' + this.state.biography + '&birthdate=' + this.state.AgeGap  );
      
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
          const res = await axios.get('http://localhost:3001/searchlocat?mylocation=' + this.state.mylocation + '&biography=' + this.state.biography + '&birthdate=' + this.state.AgeGap  );
    
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

    render () {
        const {
            suggestions,
            fame,
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
                                Bio:
                            </div>
                            <div className="BrowseSpan">
                                Sort by:
                            </div>
                            <button onClick={this.getSugg} className="Searchbutt" type="button">Search</button>
                        </div>
                            <div className="searchItemBlock">
                            <textarea type='text' name='AgeGap' onChange={this.SearchHandler} id="SearchItem"/>
                            <textarea type='text' name='mylocation' onChange={this.SearchHandler} id="SearchItem"/>
                            <textarea type='text' name='biography' onChange={this.SearchHandler} id="SearchItem"/>
                            <div>
                            <input className="searchradio" type='radio' name='sort' value="date_part" onChange={this.SearchHandler}/>
                                <label for="Age">Age</label>
                                <input className="searchradio" type='radio' name='sort' value="mylocation" onChange={this.SearchHandler}/>
                                <label for="Location">Location</label>
                                <input className="searchradio" type='radio' name='sort' value="biography" onChange={this.SearchHandler}/>
                                <label for="Interest">Bio</label>
                            </div>
                            </div>
                        </div>
                        <div></div>
                       {
                           suggestions.map(
                           suggestion => <div className="browseProfcontainer">
                                <span className="searchSpan">Username: {suggestion.username}</span>
                                <span className="searchSpan">First Name: {suggestion.first_name}</span>
                                <span className="searchSpan">Last Name: {suggestion.last_name}</span>
                                <span className="searchSpan">Gender: {suggestion.gender}</span>
                                <span className="searchSpan">Sexuality: {suggestion.sexuality}</span>
                                <span className="searchSpan">Biography: {suggestion.biography}</span>
                                <span className="searchSpan">My Location: {suggestion.mylocation}</span>
                                <span className="searchSpan">Fame: {fame}</span>
                                <span className="searchSpan">Birthdate: {suggestion.birthdate.split('T')[0]}</span>
                            {
                              this.state.matched
                              ? <button className="BrowseProfbutt" onClick={this.onUnlikeUser(suggestion.user_id)}>Unmatch</button>
                              : this.state.liked
                                ? <button className="BrowseProfbutt" onClick={this.onUnlikeUser(suggestion.user_id)}>Unlike</button>
                                : <button className="BrowseProfbutt" onClick={this.onLikeUser(suggestion.user_id)}>Like</button>
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
                           )
                       } 
            </div>
        )
    }
}

export default Search;