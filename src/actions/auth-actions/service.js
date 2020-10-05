/*
@
 This file contains the requests ( services )
@
*/

import axios from "axios";
import {apiUrl} from "../../config/api";
import axiosInstance from "../../config/axios-instance";

function checkAuthRequest() {
  let token = localStorage.getItem("token_copsycho");
  if (token) {
    return axios.get(apiUrl + "/auth/user", {
      headers: {
        'Authorization': "Bearer " + token,
        'Accept': "application/json",
        "Content-Type": "application/json"
      }
    });
  } else return null;

}

function logoutRequest() {
  let token = localStorage.getItem("token_copsycho");
  return axios.get(
    apiUrl + "/auth/logout",
    {
      headers: {
        'Authorization': "Bearer " + token,
        'Accept': "application/json",
        "Content-Type": "application/json"
      }
    }
  );
}


function loginRequest(values) {
  return axiosInstance({
    method: "post",
    url: "auth/login",
    data: {
      email: values.email,
      password: values.password,
    },
  });
}

function signupRequest(values) {
  return axios.post(
    apiUrl + "/auth/signup",values,
    {
      headers: {
        'Accept': "application/json",
        "Content-Type": 'multipart/form-data'
      }
    }
  );
}

const AuthServices = {
  loginRequest,
  signupRequest,
  checkAuthRequest,
  logoutRequest
};

export default AuthServices;
