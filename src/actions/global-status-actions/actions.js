/*
@
 This file contains the actions creators
@
*/

import { IS_LOADING_START, IS_LOADING_DONE, IS_LOADING_STOP } from "./types";
//import GlobalStatusServices from "./service";

export function hideProgressBar() {
  return async dispatch => {
    dispatch({
      type: IS_LOADING_STOP,
      payload: {
        isLoadingPage: false,
        loadingProgress: 100
      }
    });
  };
}

export function loadingPageAction() {
  return async dispatch => {
    dispatch({
      type: IS_LOADING_START,
      payload: {
        isLoadingPage: true,
        loadingProgress: 0
      }
    });
    try {
     // const response = await GlobalStatusServices.loadingPageRequest();
      dispatch({
        type: IS_LOADING_DONE,
        payload: {
          isLoadingPage: true,
          loadingProgress: 100
        }
      });
    } catch (e) {}
  };
}
