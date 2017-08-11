import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {
    ADD_NEW_MESSAGE,
    GET_ALL_MESSAGES
  } from '../constants/ActionConstants';

export function addNewMessage(message) {
  return axios.post('/messages', message)
    .then(({ data }) => {
      AppDispatcher.dispatch({
        type: ADD_NEW_MESSAGE,
        message: data.message
      });
    }, ({ response }) => {
      AppDispatcher.dispatch({
        type: ADD_NEW_MESSAGE,
        error: response.data.message
      });
    });
}

export function getAllMessages() {
  return axios.get('/messages')
    .then(({ data }) => {
      AppDispatcher.dispatch({
        type: GET_ALL_MESSAGES,
        messages: data.messages
      });
    }, ({ response }) => {
      AppDispatcher.dispatch({
        type: GET_ALL_MESSAGES,
        error: response.data.message
      });
    });
}
