import React, { Component } from 'react';
import MessageStore from '../stores/MessageStore';
import { addNewMessage, getAllMessages } from '../actions/MessageActions';

class Messages extends Component {
  constructor(props) {
    super(props);
    const messages = MessageStore.getAllMessages();
    this.state = {
      messages,
      loading: true
    };
    this.getMessages = this.getMessages.bind(this);
  }

  componentWillMount() {
    getAllMessages();
  }

  componentDidMount() {
    MessageStore.on('allMessages', this.getMessages);
  }

  getMessages() {
    const messages = MessageStore.getAllMessages();
    this.setState({
      messages,
      loading: false
    });
  }

  render() {
    console.log('Messages', this.state.messages);
    return (
      <h2>Helloooo</h2>
    )
  }
}

export default Messages;
