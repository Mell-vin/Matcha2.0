import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../myCSS/match.css';

class Matches extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            matches: [],
        }
    }

    componentDidMount() {
        this.getMatches();
    }

    getMatches = async () => {
        try {
            const res = await axios.get('http://localhost:3001/matches');

            if (res.status === 200) {
                console.log('matches', res.data);
                let matches = res.data;
                for (let match in matches) {
                    let userInfo = await this.getUserInfo(matches[match].userId);
                    let profileInfo = await this.getProfileInfo(matches[match].userId);

                    Object.assign(matches[match], userInfo);
                    Object.assign(matches[match], profileInfo);
                }
                this.setState({ matches: matches });
                console.log(matches);
            }
        } catch (e) { console.log(e.message || e); }
    }

    getUserInfo = async (userId) => {
        try {
            const res = await axios.get('http://localhost:3001/user?userId=' + userId);

            if (res.status === 200) {
                return res.data;
            }

            return null;
        } catch (e) { console.log(e.message || e); }
    }

    getProfileInfo = async (userId) => {
        try {
            const res = await axios.get('http://localhost:3001/profile?userId=' + userId);

            if (res.status === 200) {
                return res.data;
            }

            return null;
        } catch (e) { console.log(e.message || e); }
    }

    render() {
        const { matches } = this.state;

        return (
            <div>
                {
                    matches.map(match => <div className="MatchCont" key={match.username}>
                        <span className="MatchSpan">Username: {match.username}</span>
                        
                        <span className="MatchSpan">First Name: {match.firstName}</span>
                        
                        <span className="MatchSpan">Last Name: {match.lastName}</span>
                        
                        <span className="MatchSpan">Gender: {match.gender}</span>
                        
                        <span className="MatchSpan">Sexuality: {match.sexuality}</span>
                        
                        <span className="MatchSpan">Biography: {match.biography}</span>
                        
                        <span className="MatchSpan">Birthdate: {match.birthdate.split('T')[0]}</span>
                        
                        <Link to={'/profile/' + match.userId} >
                            <button className="Matchbutt">View Profile</button>
                        </Link>
                        
                        <Link
                            to={{
                                pathname: '/chat/' + match.matchId,
                                state: { targetUsername: match.username },
                            }}
                        >
                            <button className="Matchbutt">Chat</button>
                        </Link>
                    </div>
                    )
                }
            </div>
        );
    }
}

export default Matches;