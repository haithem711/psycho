/*
@
 This file contains the requests ( services )
@
*/
import axiosInstance from "../../config/axios-instance";


function loadingPageRequest(discussionId) {
  return true;
}

const GlobalStatusServices = {
  loadingPageRequest,
};

export default GlobalStatusServices;
