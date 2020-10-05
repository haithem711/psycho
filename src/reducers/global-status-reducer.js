import {
    IS_LOADING_START,
    IS_LOADING_DONE, IS_LOADING_STOP
} from "../actions/global-status-actions/types";
const intialState = {
    isLoadingPage:false,
    loadingProgress:0
};
const globalStatusReducer = (state = intialState, action) => {
    switch (action.type) {
        case IS_LOADING_START:
            return {
                ...state,
                isLoadingPage: action.payload.isLoadingPage,
                loadingProgress:action.payload.loadingProgress
            };
        case IS_LOADING_DONE:
            return {
                ...state,
                isLoadingPage: action.payload.isLoadingPage,
                loadingProgress:action.payload.loadingProgress
            };
        case IS_LOADING_STOP:
            return {
                ...state,
                isLoadingPage: action.payload.isLoadingPage,
                loadingProgress:action.payload.loadingProgress
            };
        default:
            return state;
    }
};

export default globalStatusReducer;
