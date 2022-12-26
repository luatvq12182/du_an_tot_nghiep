import { HIDE_CONFIRM, SHOW_CONFIRM } from "./constant";

export const showConfirm = (message, accept, reject = () => {}) => {
	return {
		type: SHOW_CONFIRM,
		message,
		accept,
		reject,
	};
};

export const hideConfirm = () => {
	return {
		type: HIDE_CONFIRM,
	};
};
