/*
@
 This file contains the actions creators
@
*/

import {
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  CLEAR_ARTICLES,
  FAILURE_LIKE_ARTICLE,
  FAILURE_REMOVE_LIKE_ARTICLE, REQUEST_LIKE_ARTICLE,
  REQUEST_REMOVE_LIKE_ARTICLE, SUCCESS_LIKE_ARTICLE,
  SUCCESS_REMOVE_LIKE_ARTICLE
} from "./types";
import ArticlesServices from "./service";



export function removeLikeFromArticle(articles, data) {
  return async dispatch => {
    dispatch({ type: REQUEST_REMOVE_LIKE_ARTICLE });
    try {
      await ArticlesServices.removeLikeFromArticleRequest(data);
      const mappedArray = await articles.map(item => {
        if (item.id === data.like_for_id) {
          item = { ...item, likes_count: item.likes_count - 1 };
          item = { ...item, liked_by_me: false };
        }
        return item;
      });
      dispatch({
        type: SUCCESS_REMOVE_LIKE_ARTICLE,
        payload: {
          articles: mappedArray
        }
      });
    } catch (e) {
      dispatch({
        type: FAILURE_REMOVE_LIKE_ARTICLE,
        payload: {}
      });
    }
  };
}

export function addLikeToArticle(articles, data) {
  return async dispatch => {
    dispatch({ type: REQUEST_LIKE_ARTICLE });
    try {
      const response = await ArticlesServices.addLikeToArticlesRequest(data);
      if( response && response.data){
        const mappedArray =  articles.map(item => {
          if (item.id === response.data.article_id) {
            item = { ...item, likes_count: item.likes_count + 1 };
            item = { ...item, liked_by_me: true };
            item = { ...item, like_id: response.data.id };
          }
          return item;
        });

        dispatch({
          type: SUCCESS_LIKE_ARTICLE,
          payload: {
            articles: mappedArray
          }
        });
      }
    } catch (e) {
      dispatch({
        type: FAILURE_LIKE_ARTICLE,
        payload: {}
      });
    }
  };
}
export function clearArticles() {

  return async dispatch => {
    dispatch({
      type: CLEAR_ARTICLES,
      payload: {
        articles: [],
        isLoading: true
      }
    });
  };
}
export function fetchArticles(urlArticles) {
  return async dispatch => {
    dispatch({ type: FETCH_ARTICLES_REQUEST });
    try {
      const response = await ArticlesServices.fetchArticlesRequest(urlArticles);
      dispatch({
        type: FETCH_ARTICLES_SUCCESS,
        payload: {
          articles: response.data.data ? response.data.data : [],
          next_page_url: response.data.next_page_url,
          hasMore: response.data.next_page_url !== null
        }
      });
    } catch (e) {
      dispatch({
        type: FETCH_ARTICLES_FAILURE,
        payload: {
          hasMore: false,
          articles: [],
          isLoading: false
        }
      });
    }
  };
}
