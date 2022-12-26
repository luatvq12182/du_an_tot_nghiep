import { HIDE_CONFIRM, SHOW_CONFIRM } from "./constant";

const initialState = {
	visible: false,
	message: "",
	accept: () => {},
	reject: () => {},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_CONFIRM:
			return {
				...state,
				visible: true,
				message: action.message,
				accept: action.accept,
				reject: action.reject,
			};

		case HIDE_CONFIRM:
			return {
				...state,
				visible: false,
			};

		default:
			return state;
	}
};

export default reducer;
