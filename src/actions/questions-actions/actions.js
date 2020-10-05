/*
@
 This file contains the actions creators
@
*/

import {
  FETCH_QUESTIONS_FAILURE,
  FETCH_QUESTIONS_REQUEST,
  FETCH_QUESTIONS_SUCCESS,
  CLEAR_QUESTIONS,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_FAILURE,
  ADD_QUESTION_REQUEST,
  REQUEST_LIKE_QUESTION,
  SUCCESS_LIKE_QUESTION,
  FAILURE_LIKE_QUESTION,
  SUCCESS_REMOVE_LIKE_QUESTION,
  FAILURE_REMOVE_LIKE_QUESTION,
  REQUEST_REMOVE_LIKE_QUESTION
} from "./types";
import QuestionsServices from "./service";

export function clearQuestions() {
  return async dispatch => {
    dispatch({
      type: CLEAR_QUESTIONS,
      payload: {
        questions: [],
        isLoading: true
      }
    });
  };
}
export function removeLikeFromQuestion(questions, data) {
  return async dispatch => {
    dispatch({ type: REQUEST_REMOVE_LIKE_QUESTION });
    try {
      await QuestionsServices.removeLikeFromQuestionRequest(data);
      const mappedArray = await questions.map(item => {
        if (item.id === data.like_for_id) {
          item = { ...item, likes_count: item.likes_count - 1 };
          item = { ...item, liked_by_me: false };
        }
        return item;
      });
      dispatch({
        type: SUCCESS_REMOVE_LIKE_QUESTION,
        payload: {
          questions: mappedArray
        }
      });
    } catch (e) {
      dispatch({
        type: FAILURE_REMOVE_LIKE_QUESTION,
        payload: {}
      });
    }
  };
}

export function addLikeToQuestion(questions, data) {
  return async dispatch => {
    dispatch({ type: REQUEST_LIKE_QUESTION });
    try {
      const response = await QuestionsServices.addLikeToQuestionRequest(data);
      if( response && response.data){
        const mappedArray =  questions.map(item => {
          if (item.id === response.data.question_id) {
            item = { ...item, likes_count: item.likes_count + 1 };
            item = { ...item, liked_by_me: true };
            item = { ...item, like_id: response.data.id };
          }
          return item;
        });

        dispatch({
          type: SUCCESS_LIKE_QUESTION,
          payload: {
            questions: mappedArray
          }
        });
      }
    } catch (e) {
      dispatch({
        type: FAILURE_LIKE_QUESTION,
        payload: {}
      });
    }
  };
}

export function fetchQuestions(urlQuestions) {
  return async dispatch => {
    dispatch({ type: FETCH_QUESTIONS_REQUEST });
    try {
      const response = await QuestionsServices.fetchQuestionsRequest(
        urlQuestions
      );
      dispatch({
        type: FETCH_QUESTIONS_SUCCESS,
        payload: {
          questions: response.data.data ? response.data.data : [],
          total: response.data.total
        }
      });
    } catch (e) {
      dispatch({
        type: FETCH_QUESTIONS_FAILURE,
        payload: {
          questions: [],
          isLoading: false
        }
      });
    }
  };
}

export function addQuestion(data) {
  return async dispatch => {
    dispatch({ type: ADD_QUESTION_REQUEST });
    try {
      const response = await QuestionsServices.addQuestionsRequest(data);
      dispatch({
        type: ADD_QUESTION_SUCCESS,
        payload: {
          questions: response.data ? response.data : [],
          next_page_url: response.data.next_page_url,
          hasMore: response.data.next_page_url !== null
        }
      });
    } catch (e) {
      dispatch({
        type: ADD_QUESTION_FAILURE,
        payload: {
          hasMore: false,
          questions: [],
          isLoading: false
        }
      });
    }
  };
}
