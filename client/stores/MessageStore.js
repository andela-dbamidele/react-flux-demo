import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {
    ADD_NEW_MESSAGE,
    GET_ALL_MESSAGES
  } from '../constants/ActionConstants';

class MessageStore extends EventEmitter {
  constructor() {
    super();
    this.messages = [];
    this.getAllMessages = this.getAllMessages.bind(this);
    this.handleActions = this.handleActions.bind(this);
  }

  getAllMessages() {
    return this.messages;
  }

  handleActions(action) {
    switch (action.type) {
      case ADD_NEW_MESSAGE:
        this.messages.push(action.message);
        this.emit('newMessage');
        break;
      case GET_ALL_MESSAGES:
        this.messages = action.messages;
        this.emit('allMessages');
        break;
      default:
    }
  }
}

const messageStore = new MessageStore();

AppDispatcher.register(messageStore.handleActions.bind(messageStore));

export default messageStore;
