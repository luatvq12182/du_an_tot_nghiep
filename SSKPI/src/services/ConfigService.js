import {
	CANDIDATE_CREATE,
	CANDIDATE_EDIT,
} from "../constants/apiPath";
import { Utils } from "./util";

export default class ConfigService {
	fetch() {
		return Utils.get();
	}

	changeConfig(data) {
		return Utils.post(CANDIDATE_EDIT + data.id, data);
	}
}
