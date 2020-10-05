/*
@
 This file contains the actions creators
@
*/

import {
  FETCH_CHAT_FAILURE,
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  POST_CHAT_REQUEST,
  POST_CHAT_SUCCESS,
  POST_CHAT_FAILURE,
  CLEAR_CHAT,
  ADD_CHAT_MESSAGE,
  RECIVED_CHAT_MESSAGE,
  GET_CHAT_MEMBERS,
  SET_ACTIVE_CHAT_MEMBERS
} from "./types";
import ChatServices from "./service";

export function clearChat() {
  return async dispatch => {
    dispatch({
      type: CLEAR_CHAT,
      payload: {
        messages: [],
        isLoading: true
      }
    });
  };
}

export function addMessage(message) {
  return async dispatch => {
    dispatch({
      type: ADD_CHAT_MESSAGE,
      payload: {
        message: message
      }
    });
  };
}
export function receivedMessage(message) {
  return async dispatch => {
    dispatch({
      type: RECIVED_CHAT_MESSAGE,
      payload: {
        message: message
      }
    });
  };
}

export function setActiveChatMembers(members) {
  return async dispatch => {
    dispatch({
      type: SET_ACTIVE_CHAT_MEMBERS,
      payload: {
        activeChatMembers: members
      }
    });
  };
}

export function getMembers(discussionId) {
  return async dispatch => {
    try {
      const response = await ChatServices.getChatMembersRequest(discussionId);
      dispatch({
        type: GET_CHAT_MEMBERS,
        payload: {
          members: response.data
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
}
export function postMessage(data,urlChat ) {
  return async dispatch => {
    dispatch({
      type: POST_CHAT_REQUEST
    });
    try {
      await ChatServices.postChatRequest(data,urlChat);
      dispatch({
        type: POST_CHAT_SUCCESS
      });

    } catch (e) {
      dispatch({
        type: POST_CHAT_FAILURE
      });
    }
  };
}

export function fetchChat(urlChat) {
  return async dispatch => {
    dispatch({ type: FETCH_CHAT_REQUEST });
    try {
      const response = await ChatServices.fetchChatRequest(urlChat);

      if (response.data.data) {
        dispatch({
          type: FETCH_CHAT_SUCCESS,
          payload: {
            messages: response.data.data,
            next_page_url: response.data.next_page_url,
            hasMore: response.data.next_page_url !== null && response.data.data
          }
        });
      } else {
        dispatch({
          type: FETCH_CHAT_SUCCESS,
          payload: {
            messages: response.data,
            next_page_url: response.data.next_page_url,
            hasMore: response.data.next_page_url !== null
          }
        });
      }
    } catch (e) {
      dispatch({
        type: FETCH_CHAT_FAILURE
      });
    }
  };
}
