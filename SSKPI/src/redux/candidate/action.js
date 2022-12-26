import { showMessage } from "redux/messageBox/actionCreator";
import { emitEvent } from "utils/emitEvent";
import { getNameCurrentUser } from "utils/localStorage";

const { default: CandidateService } = require("services/CandidateService");
const {
    GET_CANDIDATE,
    CREATE_CANDIDATE,
    EDIT_CANDIDATE,
    DELETE_CANDIDATE,
    REJECT,
} = require("./contanst");

const service = new CandidateService();
const nameCurrentUser = getNameCurrentUser();

const getCandidate = () => async(dispatch) => {
    try {
        const res = await service.searchCandidateList();
        dispatch({ type: GET_CANDIDATE, payload: res.data });
    } catch (error) {}
};
const addCandidate = (item) => async(dispatch) => {
    try {
        const res = await service.createCandidate(item);
        dispatch({ type: CREATE_CANDIDATE, payload: res.data });
        dispatch(showMessage("Thêm ứng viên thành công!"));

        emitEvent(
            `<b>${nameCurrentUser}</b> đã tạo một hồ sơ ứng viên mới`,
            `/admin/candidate/edit/${res.data.id}`,
            "CANDIDATE/CREATED"
        );
    } catch ({ error }) {
        dispatch({ type: REJECT, payload: "error" });
        dispatch(
            showMessage(
                "Đã tồn tại ứng viên này, không thể thêm ứng viên ",
                "ERROR"
            )
        );
    }
};
const editCandidate = (id, item) => async(dispatch) => {
    try {
        const res = await service.editCandidate(id, item);
        dispatch({ type: EDIT_CANDIDATE, payload: res.data });
        dispatch(showMessage("Sửa ứng viên thành công!"));
        emitEvent(
            `<b>${nameCurrentUser}</b> đã cập nhật một hồ sơ một ứng viên`,
            `/admin/candidate/edit/${res.data.id}`,
            "CANDIDATE/UPDATED"
        );
    } catch (error) {
        dispatch({ type: REJECT, payload: "error" });
        dispatch(showMessage(error.message, "ERROR"));
    }
};
const removeCandidate = (id) => async(dispatch) => {
    try {
        await service.deleteCandidate(id);
        dispatch({ type: DELETE_CANDIDATE, payload: id });
    } catch (error) {}
};
export { getCandidate, addCandidate, editCandidate, removeCandidate };