import { STATUS_REQUEST } from "constants/app";
import { showMessage } from "redux/messageBox/actionCreator";
import InterviewService from "services/InterviewService";
import { emitEvent } from "utils/emitEvent";
import { getNameCurrentUser } from "utils/localStorage";
import {
    INTERVIEW_FETCH,
    INTERVIEW_INSERT,
    INTERVIEW_UPDATE,
} from "./constant";

const service = new InterviewService();
const nameCurrentUser = getNameCurrentUser();

export const fetchInterview = () => async(dispatch) => {
    dispatch({
        type: INTERVIEW_FETCH,
        status: STATUS_REQUEST.LOADING,
        payload: [],
    });

    service
        .fetchInterview()
        .then((res) => {
            if (res.data === null) {
                return "";
            } else {
                dispatch({
                    type: INTERVIEW_FETCH,
                    status: STATUS_REQUEST.SUCCEEDED,
                    payload: res.data,
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: INTERVIEW_FETCH,
                status: STATUS_REQUEST.ERROR,
                payload: error.message,
            });
        });
};

export const createInterview = (data, callbackSuc, callbackErr) => async(dispatch) => {
    dispatch({
        type: INTERVIEW_INSERT,
        status: STATUS_REQUEST.LOADING,
        payload: [],
    });

    service
        .createInterview(data)
        .then((res) => {
            dispatch(fetchInterview());

            dispatch(showMessage("Tạo lịch phỏng vấn thành công!"));

            callbackSuc();

            emitEvent(
                `<b>${nameCurrentUser}</b> đã tạo mới một lịch phỏng vấn`,
                `/admin/interview`,
                "INTERVIEW/CREATED"
            );
        })
        .catch((error) => {
            callbackErr();

            dispatch({
                type: INTERVIEW_INSERT,
                message: error.message,
                status: STATUS_REQUEST.ERROR,
            });

            dispatch(showMessage(error.message));
        });
};

export const editInterview = (data) => async(dispatch) => {
    try {
        const res = await service.editInterview(data);
        dispatch({ type: INTERVIEW_UPDATE, payload: res.data });
    } catch (error) {}
};