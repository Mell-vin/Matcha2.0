import React from 'react';
import axios from 'axios';
import '../myCSS/chat.css';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: ''
    };
  }

  componentDidMount() {
    this.getMessages();
  }

  getMessages = async () => {
    const { match: { params }} = this.props;

    try {
      const res = await axios.get('http://localhost:3001/messages?matchId=' + params.matchId);

      if (res.status === 200) {
        this.setState({ messages: res.data });
      }
    } catch (e) { console.log(e.message || e); }
  }

  onSendMessage = async () => {
    const { match: { params }} = this.props;

    try {
      await axios.post(
        'http://localhost:3001/message',
        {
          matchId: params.matchId,
          chatMessage: this.state.message,
        }
      );

      this.setState({ message: '' });
      await this.getMessages();
    } catch (e) { console.log(e.message || e); }
  }

  render() {
    const { messages } = this.state;
    const { targetUsername } = this.props.location.state;

    return (
      <div className="ChatCont">
        <h1>Chat Room</h1>
        <div className="ChatSplit">
        {
          messages.map((message, index) => <div key={index}>
            <span className="ChatSpan">
            {
              message.user_id === this.props.userId
              ? "You"
              : targetUsername
            }
            </span>:
            <span className="chatMsg">{message.chat_message}</span>
            <span className="chatMsgDate">({message.date_created.split('T')[0]})</span>
          </div>
          )
        }
        </div>
        <textarea className="textInput"
          value={this.state.message}
          onChange={(event) => {
            this.setState({ message: event.target.value });
          }}
          placeholder="Type a message..."
        ></textarea>
        <br />
        <button className="Chatbutt" onClick={this.onSendMessage} >Send</button>
      </div>
    );
  }
}

export default Chat;