/*
@
 This file contains the requests ( services )
@
*/
import axiosInstance from "../../config/axios-instance"



function fetchChatRequest(urlChat) {
  return axiosInstance({
    method: "get",
    url: urlChat,
    data:null
  });
}

function postChatRequest(data, urlChat) {
  return axiosInstance({
    method: "post",
    url: urlChat,
    data:data
  });
}
function getChatMembersRequest(discussionId) {
  return axiosInstance({
    method: "get",
    url: `/discussions/${discussionId}/members`,
    data:null
  });
}

const ChatServices = {
  fetchChatRequest,
  postChatRequest,
  getChatMembersRequest
};

export default ChatServices;
