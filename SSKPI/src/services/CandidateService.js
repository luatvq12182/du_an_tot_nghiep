import {
	CANDIDATE_CREATE,
	CANDIDATE_DELETE,
	CANDIDATE_EDIT,
	CANDIDATE_LIST,
} from "../constants/apiPath";
import { Utils } from "./util";

export default class CandidateService {
	searchCandidateList(query) {
		return Utils.get(CANDIDATE_LIST, query);
	}

	createCandidate(data) {
		return Utils.postMultipart(CANDIDATE_CREATE, data);
	}

	editCandidate(id, data) {
		return Utils.post(CANDIDATE_EDIT + id, data);
	}

	deleteCandidate(id) {
		return Utils.del(CANDIDATE_DELETE + id);
	}
}
