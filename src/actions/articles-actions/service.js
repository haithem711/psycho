/*
@
 This file contains the requests ( services )
@
*/
import axiosInstance from "../../config/axios-instance";

function fetchArticlesRequest(urlArticles) {
  return axiosInstance({
    method: "get",
    url: urlArticles,
    data:null
  });
}
function addLikeToArticlesRequest(data) {
  return axiosInstance({
    method: "post",
    url: "/likes",
    data: data
  });
}


function removeLikeFromArticleRequest(data) {
  return axiosInstance({
    method: "delete",
    url: "/likes/"+data.like_id,
    data: null
  });
}
const ArticlesServices = {
  fetchArticlesRequest,
  addLikeToArticlesRequest,
  removeLikeFromArticleRequest
};

export default ArticlesServices;
