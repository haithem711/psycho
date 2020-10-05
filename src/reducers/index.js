import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import alertReducer from "./alert-reducer";
import advisorsReducer from "./advisors-reducer";
import dynamicModalReducer from "./dynamic-modal-reducer";
import articlesReducer from "./articles-reducer";
import discussionsReducer from "./discussions-reducer";
import chatReducer from "./chat-reducer";
import globalStatusReducer from "./global-status-reducer";
import questionsReducer from "./questions-reducer";
const rootReducer = combineReducers({
  authReducer,
  alertReducer,
  dynamicModalReducer,
  articlesReducer,
  advisorsReducer,
  discussionsReducer,
  chatReducer,
  globalStatusReducer,
  questionsReducer
});

export default rootReducer;
