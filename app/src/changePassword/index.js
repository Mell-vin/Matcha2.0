import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../myCSS/changePwd.css';

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newpassword: '',
            password: '',
        }
    }       

            onChangePwd = async () => {
                if (this.state.newpassword == this.state.password) 
                {   
                    try {
                        const res = await axios.post(
                            'http://localhost:3001/password',
                            { password: this.state.password }
                        );
                        if (res.status === 400) {
                            alert('Invalid password');
                        }
                        if (res.status === 200) {
                            this.props.onSetPwd(this.state.password);
                            this.props.onUserLogout();
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
                <button className="changeEmailbutt" onClick={this.onChangePwd} >Submit</button>
            </div>
        );
    }
}

export default withRouter(ChangePassword);