/*
@
 This file contains the actions creators
@
*/

import {
  FETCH_DISCUSSIONS_FAILURE,
  FETCH_DISCUSSIONS_REQUEST,
  CLEAR_DISCUSSIONS,
  FETCH_DISCUSSIONS_SUCCESS,
  DELETE_DISCUSSIONS_FAILURE,
  DELETE_DISCUSSIONS_SUCCESS,
  DELETE_DISCUSSIONS_REQUEST,
  CHANGING_DISCUSSION_STATUS,
    NEW_DISSCUSSION_ADDED
} from "./types";
import DiscussionsServices from "./service";
import { GET_OR_CREATE_DISCUSSION } from "./types";
import { apiUrl } from "../../config/api";
export function newDisscussionAdded(data) {
  return async dispatch => {
    dispatch({
      type: NEW_DISSCUSSION_ADDED,
      payload: {
        newDisscussionData: data
      }
    });
  };
}

export function resetDiscussionStatus(isChanging) {
  return async dispatch => {
    dispatch({
      type: CHANGING_DISCUSSION_STATUS,
      payload: {
        isChangingDiscussions: isChanging
      }
    });
  };
}

export function deleteDiscussion(discussionId) {
  return async dispatch => {
    dispatch({ type: DELETE_DISCUSSIONS_REQUEST });
    try {
      const response = await DiscussionsServices.deleteDisscussionRequest(
        apiUrl + "/discussions/" + discussionId
      );

      await dispatch({
        type: DELETE_DISCUSSIONS_SUCCESS,
        payload: {
          discussionId: discussionId
        }
      });
      return response.data;
    } catch (e) {
      dispatch({
        type: DELETE_DISCUSSIONS_FAILURE
      });
    }
  };
}

export function getOrCreateDiscussion(connectedUsedId, discussWithId) {
  return async dispatch => {
    try {
      const response = await DiscussionsServices.getOrCreateDiscussionRequest(
        apiUrl +
          "/users/" +
          connectedUsedId +
          "/discussions-with/" +
          discussWithId
      );

      localStorage.setItem("new-discussion-id", response.data.id);
      const newDiscussionIdLocal = localStorage.getItem("new-discussion-id");
      dispatch({
        type: GET_OR_CREATE_DISCUSSION,
        payload: {
          discussionCreated:response.data,
          newDiscussionId: newDiscussionIdLocal
        }
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
}

export function clearDiscussions() {
  return async dispatch => {
    dispatch({
      type: CLEAR_DISCUSSIONS,
      payload: {
        discussions: []
      }
    });
  };
}

export function fetchDiscussions(urlDiscussions) {
  return async dispatch => {
    dispatch({ type: FETCH_DISCUSSIONS_REQUEST });
    try {
      const response = await DiscussionsServices.fetchDiscussionsRequest(
        urlDiscussions
      );
      if (response.data.data) {

        dispatch({
          type: FETCH_DISCUSSIONS_SUCCESS,
          payload: {
            discussions: response.data.data,
            next_page_url: response.data.next_page_url!==null ? response.data.next_page_url:null,
            hasMore:
              response.data.to < response.data.total
          }
        });
      } else {
        dispatch({
          type: FETCH_DISCUSSIONS_SUCCESS,
          payload: {
            discussions: response.data,
            next_page_url:  response.data.next_page_url!==null ? response.data.next_page_url:null,
            hasMore:   response.data.to < response.data.total
          }
        });
      }
    } catch (e) {
      dispatch({
        type: FETCH_DISCUSSIONS_FAILURE,
        payload: {
          hasMore: false,
          discussions: [],
          isLoading: false
        }
      });
    }
  };
}
