import {
	CANDIDATE_INTERVIEW_CREATE,
	CANDIDATE_INTERVIEW_LIST,
	CANDIDATE_INTERVIEW_EDIT,
} from "../constants/apiPath";
import { Utils } from "./util";

export default class CandidateInterviewService {
	CandidateInterviewList() {
		return Utils.get(CANDIDATE_INTERVIEW_LIST);
	}

	createCandidateInterview(data) {
		return Utils.post(CANDIDATE_INTERVIEW_CREATE, data);
	}

	editCandidateInterview(data) {
		return Utils.post(CANDIDATE_INTERVIEW_EDIT + data.id, data);
	}
}
