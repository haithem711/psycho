/*
@
 This file contains the requests ( services )
@
*/
import axiosInstance from "../../config/axios-instance";

function fetchQuestionsRequest(urlQuestions) {
  return axiosInstance({
    method: "get",
    url: urlQuestions,
    data:null
  });
}

function addLikeToQuestionRequest(data) {
  return axiosInstance({
    method: "post",
    url: "/likes",
    data: data
  });
}


function removeLikeFromQuestionRequest(data) {
  return axiosInstance({
    method: "delete",
    url: "/likes/"+data.like_id,
    data: null
  });
}
function addQuestionsRequest(data) {
  return axiosInstance({
    method: "post",
    url: "/questions",
    data:data
  });
}

const QuestionsServices = {
  fetchQuestionsRequest,
  addQuestionsRequest,
  addLikeToQuestionRequest,
  removeLikeFromQuestionRequest
};

export default QuestionsServices;
