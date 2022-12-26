import { HIDE_MESSAGE, SHOW_MESSAGE } from "./constant";

export const showMessage = (message, typeDialog = "SUCCESS") => ({
	type: SHOW_MESSAGE,
	message: message,
	typeDialog: typeDialog,
});

export const hideMessage = () => ({
	type: HIDE_MESSAGE,
	message: null,
});
