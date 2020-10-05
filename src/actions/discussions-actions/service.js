/*
@
 This file contains the requests ( services )
@
*/
import axiosInstance from "../../config/axios-instance";

function fetchDiscussionsRequest(urlMessages) {
  return axiosInstance({
    method: "get",
    url: urlMessages,
    data:null
  });
}
function getOrCreateDiscussionRequest(urlChat) {
  return axiosInstance({
    method: "get",
    url: urlChat,
    data:null
  });
}

function deleteDisscussionRequest(urlDiscussion) {
  return axiosInstance({
    method: "delete",
    url: urlDiscussion,
    data:null
  });
}
const DiscussionsServices = {
  fetchDiscussionsRequest,
  getOrCreateDiscussionRequest,
  deleteDisscussionRequest
};

export default DiscussionsServices;
