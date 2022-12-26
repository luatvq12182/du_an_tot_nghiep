import { combineReducers } from "redux";
import jobRequestReducer from "./jobRequest/reducer";
import reducerCandidate from "./candidate/reducer";
import reducerCandidateInterview from "./candidateInterview/reducer";
import interviewReducer from "./interview/reducer";
import messageBoxReducer from "./messageBox/reducer";
import confirmBoxReducer from "./confirmBox/reducer";
import userReducer from "./user/reducer";

const rootReducer = combineReducers({
	cadidate: reducerCandidate,
	jobRequest: jobRequestReducer,
	candidateInterview: reducerCandidateInterview,
	interview: interviewReducer,
	messageBox: messageBoxReducer,
	confirmBox: confirmBoxReducer,
	user: userReducer,
});

export default rootReducer;
