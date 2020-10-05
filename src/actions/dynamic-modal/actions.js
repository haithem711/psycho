/*
@
 This file contains the actions creators
@
*/

import { DYNAMIC_MODAL_CLOSE, DYNAMIC_MODAL_OPEN } from "./types";

export function dynamicModalOpen() {
  return async dispatch => {
    dispatch({ type: DYNAMIC_MODAL_OPEN });
  };
}

export function dynamicModalClose() {
  return async dispatch => {
    dispatch({ type: DYNAMIC_MODAL_CLOSE });
  };
}
