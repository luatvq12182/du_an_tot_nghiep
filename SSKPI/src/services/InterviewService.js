import {
    INTERVIEW_CREATE,
    INTERVIEW_DELETE,
    INTERVIEW_EDIT,
    INTERVIEW_LIST,
} from "constants/apiPath";
import { Utils } from "./util";

export default class InterviewService {
    fetchInterview() {
        return Utils.get(INTERVIEW_LIST);
    }

    createInterview(data) {
        return Utils.post(INTERVIEW_CREATE, data);
    }

    editInterview(data) {
        return Utils.put(INTERVIEW_EDIT + data.id, data);
    }

    deleteInterview(id) {
        return Utils.del(INTERVIEW_DELETE + id);
    }
}