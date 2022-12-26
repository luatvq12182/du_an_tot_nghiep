import {
	JOBREQUEST_APPROVE,
	JOBREQUEST_CREATE,
	JOBREQUEST_DELETE,
	JOBREQUEST_EDIT,
	JOBREQUEST_EXPORT,
	JOBREQUEST_LIST,
} from "constants/apiPath";
import { APPROVAL_STATUS } from "constants/app";
import { get } from "react-hook-form";
import { Utils } from "./util";

export default class JobRequestService {
	fetchJobRequest(query) {
		return Utils.get(JOBREQUEST_LIST, query);
	}

	createJobRequest(data) {
		return Utils.post(JOBREQUEST_CREATE, data);
	}

	editJobRequest(data) {
		return Utils.post(JOBREQUEST_EDIT + data.id, data);
	}

	deleteJobRequest(id) {
		return Utils.del(JOBREQUEST_DELETE + id);
	}

	approvalJobRequest(id) {
		return Utils.post(JOBREQUEST_APPROVE + id, {
			status: APPROVAL_STATUS.DA_DUYET,
		});
	}

	rejectJobRequest(id, reason) {
		return Utils.post(JOBREQUEST_APPROVE + id, {
			status: APPROVAL_STATUS.TU_CHOI,
			reason: reason,
		});
	}

	exportPDF(id) {
		return Utils.get(JOBREQUEST_EXPORT + id)
	}
}
