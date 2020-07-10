import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../myCSS/changePwd.css';

class ForgotReset extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            newpassword: '',
            password: '',
        }
    }       

            onResetPwd = async () => {
                if (this.state.newpassword == this.state.password) 
                {
                    const queryString = window.location.search;
                    // console.log(queryString);
                    const urlParams = new URLSearchParams(queryString);
                    // console.log(urlParams);
                    const verifytoken = urlParams.get('token')
                    // console.log(verifytoken);
                    this.setState({username: verifytoken});
                    try {
                        const res = await axios.post(
                            'http://localhost:3001/forgotreset',
                            { 
                                username: this.state.username,
                                password: this.state.password
                            }
                        );
                        if (res.status === 400) {
                            alert('Invalid password');
                        }        
                        if (res.status === 200) {
                            this.props.history.push('/login');
                        }
                    } catch (e) { console.log(e.message || e); }
                }
                else
                    alert("Passwords don't match");
            }

    render() {
        return (
            <div className="changePwdCont">
                <label className="changePwdSpan">
                    New Password:
                    <input
                        type="password"
                        placeholder="New Password"
                        value={this.state.newpassword}
                        onChange={
                            (event) => {
                                this.setState({ newpassword: event.target.value });
                            }
                        }
                    ></input>
                </label>
                <label className="changePwdSpan">
                    Confirm Password:
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={this.state.password}
                        onChange={
                            (event) => {
                                this.setState({ password: event.target.value });
                            }
                        }
                    ></input>
                </label>
                <button className="changeEmailbutt" onClick={this.onResetPwd} >Submit</button>
            </div>
        );
    }
}

export default withRouter(ForgotReset);