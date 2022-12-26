import {
	CANDIDATE_INTERVIEW_CREATE,
	CANDIDATE_INTERVIEW_LIST,
} from "./constant";

const initialState = {
	candidateInterview: [],
};

const reducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case CANDIDATE_INTERVIEW_LIST:
			return { ...state, candidateInterview: payload };

		case CANDIDATE_INTERVIEW_CREATE:
			return {
				...state,
				candidateInterview: [...state.candidateInterview, payload],
			};
		default:
			return state;
	}
};
export default reducer;
