import { INTERVIEWER, MANAGER } from "constants/app";

export const getAllUsers = (state) => state.user.data;
export const getManagerAndHrManager = (state) =>
	state.user.data.filter(
		(item) =>
			item.roles[0]?.id === MANAGER || item.roles[0]?.id === INTERVIEWER
	);
