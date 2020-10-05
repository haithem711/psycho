import {
  ALERT_ERROR,
  ALERT_SUCCESS,
  ALERT_WARNING,
  HIDE_ALERT
} from "../actions/alert-actions/types";
const intialState = {
  showAlert: false,
  alertMessage: "Please verify your data",
  alertType: "error"
};
const alertReducer = (state = intialState, action) => {
  switch (action.type) {
    case ALERT_ERROR:
      return {
        ...state,
        showAlert: true,
        alertMessage: action.payload,
        alertType: "error"
      };
    case ALERT_WARNING:
      return {
        ...state,
        showAlert: true,
        alertMessage: action.payload,
        alertType: "warning"
      };
    case ALERT_SUCCESS:
      return {
        ...state,
        showAlert: true,
        alertMessage: action.payload,
        alertType: "success"
      };
    case HIDE_ALERT:
      return {
        ...state,
        showAlert: false
      };
    default:
      return state;
  }
};

export default alertReducer;
