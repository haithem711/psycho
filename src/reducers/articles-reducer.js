import {
  CLEAR_ARTICLES,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS, SUCCESS_LIKE_ARTICLE, SUCCESS_REMOVE_LIKE_ARTICLE
} from "../actions/articles-actions/types";

const initialState = {
  articles: [],
  next_page_url:'/articles',
  hasMore:true,
  isLoading:false,
  isSendingRequest:false
};
const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ARTICLES:
      return {
        ...state,
        articles: [],
        isLoading: true,
        next_page_url: "/articles",
        isSendingRequest:false
      };
    case SUCCESS_LIKE_ARTICLE:
      return {
        ...state,
        articles:action.payload.articles
      };
    case SUCCESS_REMOVE_LIKE_ARTICLE:
      return {
        ...state,
        articles:action.payload.articles
      };
    case FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSendingRequest:true
      };
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: [...state.articles, ...action.payload.articles],
        next_page_url:action.payload.next_page_url,
        hasMore: action.payload.hasMore,
        isLoading:false,
        isSendingRequest:false
      };
    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        hasMore:action.payload.hasMore,
        isLoading:false
      };

    default:
      return state;
  }
};

export default articlesReducer;
