import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILURE,
  CHECK_AUTH_REQUEST,
  LOGOUT_REQUEST, DISCONNECT_THE_USER, CONNECT_THE_USER
} from "../actions/auth-actions/types";

const intialState = {
  isSendingRequest: false,
  user: {},
  isLoggedIn: false,
  redirectToHome: false,
  isLoadingUser:true
};


const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case CHECK_AUTH_REQUEST:
      return {
        ...state,
        isLoadingUser:true
      };
    case CHECK_AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isSendingRequest: false,
        isLoadingUser:false
      };

    case CHECK_AUTH_FAILURE:
      return {
        ...state,
        isLoadingUser:false,
        isLoggedIn: false,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isSendingRequest: true,
        redirectToHome: false
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isSendingRequest: false,
        redirectToHome: false,
        isLoggedIn:  false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isSendingRequest: false,
        user: action.payload.user,
        isLoggedIn: true,
        redirectToHome: true,
        token: action.payload.access_token
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isSendingRequest: false,

      };

    //Sign up
    case SIGNUP_REQUEST:
      return {
        ...state,
        isSendingRequest: true,
        redirectToHome: false
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSendingRequest: false,
        user: action.payload.user,
        isLoggedIn: true,
        redirectToHome: true,
        token: action.payload.access_token
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        isSendingRequest: false
      };
    case DISCONNECT_THE_USER:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
        token:null,
      };

    case CONNECT_THE_USER:
      return {
        ...state,
        isLoggedIn: true,
        token:action.payload.token,
      };
    default:
      return state;
  }
};

export default authReducer;
