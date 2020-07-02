import React from 'react';
import axios from 'axios';
import '../myCSS/changePwd.css';

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: ''
        }
    }

            onChangePwd = async () => {
                try {
                    const res = await axios.post(
                        'http://localhost:3001/password',
                        { password: this.state.password }
                    );
    
                    if (res.status === 200) {
                        this.props.onChangePwd(this.state.password);
                        this.props.history.push('/profile');
                    }
                } catch (e) { console.log(e.message || e); }
            }

    render() {
        return (
            <div className="changePwdCont">
                <label className="changePwdSpan">
                    New Password:
                    <input
                        type="password"
                        placeholder="New Password"
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

export default ChangePassword;