import { INTERVIEW } from "../constants/apiPath";
import { Utils } from "./util";

export default class Interview {
	interviewList() {
		return Utils.get(INTERVIEW);
	}
}
