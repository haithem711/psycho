import {
  FETCH_ADVISORS_FAILURE,
  FETCH_ADVISORS_SUCCESS,
  FETCH_ADVISORS_REQUEST,
  CLEAR_ADVISORS
} from "../actions/advisors-actions/types";

const initialState = {
  advisors: [],
  isLoading: false,
  isMakingRequest:false,
  total:0
};
const advisorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADVISORS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isMakingRequest:true
      };
    case CLEAR_ADVISORS:
      return {
        ...state,
        advisors: [],
        isLoading: false
      };
    case FETCH_ADVISORS_SUCCESS:
      return {
        ...state,
        isMakingRequest:false,
        advisors: [...state.advisors, ...action.payload.advisors],
        isLoading: false,
        total:action.payload.total
      };
    case FETCH_ADVISORS_FAILURE:
      return {
        ...state,
        advisors: [...state.advisors],
        isLoading: false
      };

    default:
      return state;
  }
};

export default advisorsReducer;
