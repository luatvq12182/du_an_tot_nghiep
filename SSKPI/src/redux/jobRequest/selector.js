import { APPROVAL_STATUS, MANAGER } from "constants/app";
import { getIdCurrentUser, getRoleCurrentUser } from "utils/localStorage";

export const getJobRequest = (state) => {
	if (Array.isArray(state.jobRequest.data)) {
		const role = getRoleCurrentUser();
		const id = getIdCurrentUser();

		const data = state.jobRequest.data.map((item) => {
			return {
				...item,
				petitioner_name: item.petitioner.name,
				// status:
				// 	item.status === null || item.status === undefined
				// 		? APPROVAL_STATUS.CHO_DUYET
				// 		: item.status,
			};
		});

		if(role === MANAGER) {
			return data.filter(item => item.petitioner.id === id)
		}

		return data;
	} else {
		return state.jobRequest.data;
	}
};

export const getStatusJobRequest = (state) => state.jobRequest.status;

export const getMessageJobRequest = (state) => state.jobRequest.message;

export const getJobRequestById = (id) => (state) =>
	state.jobRequest.data.find((item) => Number(item.id) === Number(id));

export const getNewJobRequest = (state) =>
	state.jobRequest.data.filter((item) => item.status === null);

export const getRejectJobRequest = (state) =>
	state.jobRequest.data.filter(
		(item) => item.status === APPROVAL_STATUS.CHUA_DUYET
	);

export const getApprovedJobRequest = (state) =>
	state.jobRequest.data.filter(
		(item) => item.status === APPROVAL_STATUS.DA_DUYET
	);
