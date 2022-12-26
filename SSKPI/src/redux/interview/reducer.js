import { STATUS_REQUEST } from "constants/app";
import {
	INTERVIEW_FETCH,
	INTERVIEW_INSERT,
	INTERVIEW_UPDATE,
	INTERVIEW_DELETE,
} from "./constant";

const initialState = {
	data: [],
	status: STATUS_REQUEST.IDLE,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case INTERVIEW_FETCH:
			return {
				status: action.status,
				data: action.payload,
			};

		case INTERVIEW_INSERT:
			return {
				...state,
				message: action.message,
				data: action?.payload
					? state.data.concat(action.payload)
					: state.data,
				status: action.status,
			};

		case INTERVIEW_UPDATE:
			// {
			// 	const filter= state.data.map((item)=>{
			// 		if(item.id === action.payload.i)
			// 	})
			// }
			break;

		case INTERVIEW_DELETE: {
			const filter = state.data.filter(
				(item) => item.id !== action.payload
			);
			return {
				...state,
				data: filter,
			};
		}

		default:
			return state;
	}
};

export default reducer;
