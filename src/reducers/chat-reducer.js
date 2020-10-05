import {
    FETCH_CHAT_FAILURE,
    FETCH_CHAT_SUCCESS,
    FETCH_CHAT_REQUEST,
    CLEAR_CHAT,
    ADD_CHAT_MESSAGE,
    GET_CHAT_MEMBERS,
    RECIVED_CHAT_MESSAGE,
    SET_ACTIVE_CHAT_MEMBERS
} from "../actions/chat-actions/types";

const initialState = {
    messages: [],
    next_page_url: "",
    hasMore: true,
    isLoading: true,
    members:[],
    activeChatMembers:{}
};
const chatReducer = (state = initialState, action) => {
    switch (action.type) {

        case RECIVED_CHAT_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload.message]
            };
        case ADD_CHAT_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload.message]
            };
        case FETCH_CHAT_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case SET_ACTIVE_CHAT_MEMBERS:
            return {
                ...state,
                activeChatMembers: action.payload.activeChatMembers
            };
        case GET_CHAT_MEMBERS:
            return {
                ...state,

                members: action.payload.members
            };
        case CLEAR_CHAT:
            return {
                ...state,
                messages: [],
                isLoading: true
            };
        case FETCH_CHAT_SUCCESS:
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages],
                next_page_url: action.payload.next_page_url,
                hasMore: action.payload.hasMore,
                isLoading: false
            };
        case FETCH_CHAT_FAILURE:
            return {
                ...state,
                messages: [...state.messages],
                hasMore: false,
                isLoading: false
            };

        default:
            return state;
    }
};

export default chatReducer;
