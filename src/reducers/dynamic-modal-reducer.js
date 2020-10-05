import {
  DYNAMIC_MODAL_CLOSE,
  DYNAMIC_MODAL_OPEN,
} from "../actions/dynamic-modal/types";

const initialState = {
  isOpen: false,
};
const dynamicModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case DYNAMIC_MODAL_OPEN:
      return {
        ...state,
        isOpen: true,
      };
    case DYNAMIC_MODAL_CLOSE:
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
};

export default dynamicModalReducer;
