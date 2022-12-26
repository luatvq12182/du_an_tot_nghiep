import { APPROVAL_STATUS } from "constants/app";
import {
	JOBREQUEST_FETCH,
	JOBREQUEST_INSERT,
	JOBREQUEST_UPDATE,
	JOBREQUEST_DELETE,
	JOBREQUEST_APPROVAL,
	JOBREQUEST_REJECT,
} from "./constant";

const initialState = {
	data: [],
	message: "",
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case JOBREQUEST_FETCH:
			return {
				data: action.data,
				message: action?.message,
			};

		case JOBREQUEST_INSERT:
			return {
				...state,
				message: action.message,
				data: action?.payload
					? [...state.data, action.payload]
					: state.data,
			};

		case JOBREQUEST_UPDATE:
			return {
				message: action.message,
				data: action?.payload
					? state.data.map((item) => {
							if (item.id === action.payload.id) {
								return action.payload;
							}

							return item;
					  })
					: state.data,
			};

		case JOBREQUEST_DELETE:
			return {
				message: action.message,
				data: action?.payload
					? state.data.filter((item) => item.id !== action.payload)
					: state.data,
			};

		case JOBREQUEST_APPROVAL:
			return {
				message: action.message,
				data: action?.payload
					? state.data.map((item) => {
							if (item.id === action.payload) {
								return {
									...item,
									status: APPROVAL_STATUS.DA_DUYET,
								};
							}

							return item;
					  })
					: state.data,
			};

		case JOBREQUEST_REJECT:
			return {
				message: action.message,
				data: action?.payload
					? state.data.map((item) => {
							if (item.id === action.payload) {
								return {
									...item,
									status: APPROVAL_STATUS.TU_CHOI,
								};
							}

							return item;
					  })
					: state.data,
			};

		default:
			return state;
	}
};

export default reducer;
