import {
	CANDIDATE_INTERVIEW_CREATE,
	CANDIDATE_INTERVIEW_EDIT,
} from "constants/apiPath";
import { showMessage } from "redux/messageBox/actionCreator";
import CandidateInterviewService from "services/CandidateInterview";
import { emitEvent } from "utils/emitEvent";
import { getNameCurrentUser } from "utils/localStorage";
import { CANDIDATE_INTERVIEW_LIST } from "./constant";

const servicer = new CandidateInterviewService();
const nameCurrentUser = getNameCurrentUser();

export const getCandidateInterview = () => async (dispatch) => {
	try {
		const res = await servicer.CandidateInterviewList();
		dispatch({ type: CANDIDATE_INTERVIEW_LIST, payload: res?.data });
	} catch (error) {}
};
export const createCandidateInterview = (item) => async (dispatch) => {
	try {
		const res = await servicer.createCandidateInterview(item);
		dispatch({ type: CANDIDATE_INTERVIEW_CREATE, payload: res?.data });
		dispatch(showMessage("Đánh giá thành công!"));

		emitEvent(
			`<b>${nameCurrentUser}</b> đã tạo một đánh giá mới`,
			`/admin/candidate/interview/edit/${res.data.id}`,
			"CANDIDATE_INTERVIEW/CREATED"
		);
	} catch (error) {
		dispatch(showMessage(error.message, "ERROR"));
	}
};
export const editCandidateInterview = (item) => async (dispatch) => {
	try {
		const res = await servicer.editCandidateInterview(item);
		dispatch({ type: CANDIDATE_INTERVIEW_EDIT, payload: res?.data });
		dispatch(showMessage("Sửa đánh giá thành công!"));

		emitEvent(
			`<b>${nameCurrentUser}</b> đã cập nhật một đánh giá`,
			`/admin/candidate/interview/edit/${res.data.id}`,
			"CANDIDATE_INTERVIEW/CREATED"
		);
	} catch (error) {
		dispatch(showMessage(error.message, "ERROR"));
	}
};
