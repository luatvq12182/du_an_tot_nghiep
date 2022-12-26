import { HIDE_MESSAGE, SHOW_MESSAGE } from "./constant";

const initialState = {
	visible: false,
	message: null,
	typeDialog: "SUCCESS",
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_MESSAGE:
			return {
				visible: true,
				message: action.message,
				typeDialog: action?.typeDialog,
			};

		case HIDE_MESSAGE:
			return {
				visible: false,
				message: action.message,
			};

		default:
			return state;
	}
};

export default reducer;
