import {
  FETCH_DISCUSSIONS_FAILURE,
  FETCH_DISCUSSIONS_SUCCESS,
  FETCH_DISCUSSIONS_REQUEST,
  CLEAR_DISCUSSIONS,
  GET_OR_CREATE_DISCUSSION,
  DELETE_DISCUSSIONS_SUCCESS,
  CHANGING_DISCUSSION_STATUS,
  NEW_DISSCUSSION_ADDED
} from "../actions/discussions-actions/types";

const initialState = {
  discussions: [],
  next_page_url: "",
  hasMore: false,
  isLoading: false,
  isChangingDiscussions: false,
  newDiscussionId: 0
};
const date_sort_desc = function (date1, date2) {
  if (new Date(date1.updated_at) > new Date(date2.updated_at)) return -1;
  if (new Date(date1.updated_at) < new Date(date2.updated_at)) return 1;
  return 0;
};
const discussionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DISCUSSIONS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_DISCUSSIONS_SUCCESS:
      let discussionsTemp = [...state.discussions, ...action.payload.discussions];


      discussionsTemp.sort(date_sort_desc);
      return {
        ...state,
        discussions: discussionsTemp,
        next_page_url: action.payload.next_page_url,
        hasMore: action.payload.hasMore,
        isLoading: false
      };
    case FETCH_DISCUSSIONS_FAILURE:
      return {
        ...state,
        discussions: [...state.discussions],
        hasMore: action.payload.hasMore,
        isLoading: false
      };
    case CLEAR_DISCUSSIONS:
      return {
        ...state,
        discussions: [],
        next_page_url: ""
      };
    case GET_OR_CREATE_DISCUSSION:
      return {
        ...state,
        isLoading: false,
        newDiscussionId: action.payload.newDiscussionId
      };
    case NEW_DISSCUSSION_ADDED:
      let discussionsTempNew = [...state.discussions, action.payload.newDisscussionData];
      console.log(discussionsTempNew)
      discussionsTempNew.sort(date_sort_desc);
      return {
        ...state,
        discussions:discussionsTempNew
      };
    case DELETE_DISCUSSIONS_SUCCESS:
      return {
        ...state,
        discussions: state.discussions.filter(
          item => item.id !== action.payload.discussionId
        ),
        isChangingDiscussions: true,
        isLoading: false
      };

    case CHANGING_DISCUSSION_STATUS:
      return {
        ...state,
        isChangingDiscussions: action.payload.isChangingDiscussions
      };

    default:
      return state;
  }
};

export default discussionsReducer;
