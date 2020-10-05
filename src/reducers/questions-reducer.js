import {
    CLEAR_QUESTIONS,
    FETCH_QUESTIONS_FAILURE,
    FETCH_QUESTIONS_REQUEST,
    FETCH_QUESTIONS_SUCCESS, SUCCESS_LIKE_QUESTION,
    SUCCESS_REMOVE_LIKE_QUESTION
} from "../actions/questions-actions/types";

const initialState = {
    questions: [],
    isLoading:false,
    isSendingRequest:false,
    total:0,
};
const questionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_QUESTIONS:
            return {
                ...state,
                questions: [],
                isLoading: true,
                isSendingRequest:false
            };
        case SUCCESS_LIKE_QUESTION:
            return {
                ...state,
                questions:action.payload.questions
            };
        case SUCCESS_REMOVE_LIKE_QUESTION:
            return {
                ...state,
                questions:action.payload.questions
            };
        case FETCH_QUESTIONS_REQUEST:
            return {
                ...state,
                questions:[],
                isLoading: true,
                isSendingRequest:true
            };
        case FETCH_QUESTIONS_SUCCESS:
            return {
                ...state,
                questions: action.payload.questions,
                isLoading:false,
                isSendingRequest:false,
                total:!state.questions.length>0 ? action.payload.total : state.total
            };
        case FETCH_QUESTIONS_FAILURE:
            return {
                ...state,
                isLoading:false
            };

        default:
            return state;
    }
};

export default questionsReducer;
