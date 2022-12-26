import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { checkLogin } from "./middleware";

import { fetchJobRequest } from "./jobRequest/actionCreator";
import { fetchInterview } from "./interview/actionCreator";
import { getListUsers } from "./user/actionCreator";

import { getCandidate } from "./candidate/action";
import { getCandidateInterview } from "./candidateInterview/action";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, checkLogin))
);

if (localStorage.getItem("currentUser")) {
    store.dispatch(getListUsers());
    store.dispatch(fetchJobRequest());
    store.dispatch(fetchInterview());
    store.dispatch(getCandidate());
    store.dispatch(getCandidateInterview());
}

export default store;