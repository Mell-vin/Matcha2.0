import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../myCSS/changeEmail.css';

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = { email: '' }
    }

    // componentDidMount() {
    //     this.setState({ email: this.props.email });
    // }

    onSubmitEmail = async () => {
        try {
            const res = await axios.post(
                'http://localhost:3001/forgotpassword',
                { email: this.state.email }
            );
            if (res.status === 404) {
              alert('Email not found');
            }
            if (res.status === 400) {
              alert('Invalid email');
            }
            if (res.status === 200) {
              alert("Check email inbox to verify");
              this.props.history.push('/login');
            }
        } catch (e) { console.log(e.message || e); }
    }

    render() {
        return (
            <div>
            <div className="changeEmailCont">
                <label className="changeEmailSpan">
                    Email:
                    <input
                        value={this.state.email}
                        onChange={
                            (event) => {
                                this.setState({ email: event.target.value });
                            }
                        }
                    >
                    </input>
                </label>
                <br />
                <button className="changeEmailbutt" onClick={this.onSubmitEmail} >Submit</button>
            </div>
            </div>
        );
    }
}

export default withRouter(ForgotPassword);

{/*
app.put('/email', async (req, res) => {
  if (!req.session.userId) {
    res.status(403).send();

    return;
  }

  const userData = req.body;

  console.log('userdata', userData);

  try {
    const email = await db.oneOrNone(dbUsers.validate.email, userData.email);

    console.log('response: ', email);

    if (email.count !== '0') {
      res.status(400).send();

      return;
    }
  } catch (e) {
    console.log('Error validating email address: ' + e.message || e);

    res.status(500).json({ message: 'Unfortunately we are experiencing technical difficulties right now' });

    return;
  }

  try {
    await db.none(
      dbUsers.updateEmail,
      [
        req.session.userId,
        userData.email,
      ]
    );

    res.status(200).send();

    return;
  } catch (e) {
    console.log('Error updating email address: ' + e.message || e);

    res.status(500).json({ message: 'Unfortunately we are experiencing technical difficulties right now' });

    return;
  }
});
*/}