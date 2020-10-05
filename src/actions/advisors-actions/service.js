/*
@
 This file contains the requests ( services )
@
*/
import axiosInstance from "../../config/axios-instance";

function fetchAdvisorsRequest(urlAdvisors) {
  return axiosInstance({
    method: "get",
    url: urlAdvisors,
    data:null
  });
}

const AdvisorsServices = {
  fetchAdvisorsRequest
};

export default AdvisorsServices;
