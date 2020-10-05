/*
@
 This file contains the actions creators
@
*/

import {
  FETCH_ADVISORS_FAILURE,
  FETCH_ADVISORS_REQUEST,
  FETCH_ADVISORS_SUCCESS,
  CLEAR_ADVISORS
} from "./types";
import AdvisorsServices from "./service";
export function clearAdvisors() {

  return async dispatch => {
    dispatch({
      type: CLEAR_ADVISORS
    });
  };
}
export function fetchAdvisors(urlAdvisors) {
  return async dispatch => {
    dispatch({ type: FETCH_ADVISORS_REQUEST });
    try {
      const response = await AdvisorsServices.fetchAdvisorsRequest(urlAdvisors);
      if(response.data.data){
        dispatch({
          type: FETCH_ADVISORS_SUCCESS,
          payload: {
            advisors: response.data.data,
            total:  response.data.total
          }
        });
      }

    } catch (e) {
      dispatch({
        type: FETCH_ADVISORS_FAILURE,
        payload: {
          advisors: [],
          isLoading:false
        }
      });
    }
  };
}
