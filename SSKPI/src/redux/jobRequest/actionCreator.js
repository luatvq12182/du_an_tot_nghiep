import { showMessage } from "redux/messageBox/actionCreator";
import JobRequestService from "services/JobRequestService";
import { getIdCurrentUser, getNameCurrentUser } from "utils/localStorage";
import {
	JOBREQUEST_FETCH,
	JOBREQUEST_INSERT,
	JOBREQUEST_UPDATE,
	JOBREQUEST_DELETE,
	JOBREQUEST_REJECT,
	JOBREQUEST_APPROVAL,
} from "./constant";
import { emitEvent } from "utils/emitEvent";

const service = new JobRequestService();
const nameCurrentUser = getNameCurrentUser();

export const fetchJobRequest = () => async (dispatch) => {
	dispatch({
		type: JOBREQUEST_FETCH,
		data: [],
		message: "Đang tải dữ liệu...",
	});

	service
		.fetchJobRequest()
		.then((res) => {
			dispatch({
				type: JOBREQUEST_FETCH,
				data: res.data,
				message: null,
			});
		})
		.catch((error) => {
			if (error.response.status === 401) {
				alert("Phiên đăng nhập đã hết hạn!");

				localStorage.removeItem("currentUser");
				window.location.href = "/login";
			}

			dispatch({
				type: JOBREQUEST_FETCH,
				data: "error",
				message: error?.response?.data.message,
			});
		});
};

export const insertJobRequest =
	(data, callbackSuc, callbackErr) => (dispatch) => {
		dispatch({
			type: JOBREQUEST_INSERT,
			message: "Đang xử lý",
		});

		service
			.createJobRequest(data)
			.then((res) => {
				dispatch(fetchJobRequest());

				dispatch(showMessage("Thêm yêu cầu thành công!"));
				callbackSuc();

				emitEvent(
					`<b>${nameCurrentUser}</b> đã tạo mới một yêu cầu tuyển dụng`,
					`/admin/jobrequest/detail/${res.data.id}`,
					"JOBREQUEST/CREATED"
				);

				emitEvent(
					`Bạn có một yêu cầu tuyển dụng cần phê duyệt`,
					`/admin/jobrequest/approval/${res.data.id}`,
					"JOBREQUEST/WAITING"
				);
			})
			.catch(({ response }) => {
				dispatch({
					type: JOBREQUEST_INSERT,
					message: response?.data.message,
				});

				dispatch(showMessage(response?.data.message, "ERROR"));
			});
	};

export const updateJobRequest =
	(data, callbackSuc, callbackErr) => async (dispatch) => {
		dispatch({
			type: JOBREQUEST_UPDATE,
			message: "Đang xử lý",
		});

		service
			.editJobRequest(data)
			.then((res) => {
				dispatch(fetchJobRequest());

				dispatch(showMessage("Cập nhật thành công!"));
				callbackSuc();

				emitEvent(
					`<b>${nameCurrentUser}</b> đã cập nhật một yêu cầu tuyển dụng`,
					`/admin/jobrequest/detail/${data.id}`,
					"JOBREQUEST/UPDATED"
				);
			})
			.catch((error) => {
				callbackErr();

				dispatch({
					type: JOBREQUEST_UPDATE,
					message: error.message,
				});

				dispatch(showMessage(error.message, "ERROR"));
			});
	};

export const deleteJobRequest = (id) => (dispatch) => {
	dispatch({
		type: JOBREQUEST_DELETE,
		message: "Đang xử lý",
	});

	service
		.deleteJobRequest(id)
		.then((res) => {
			const nameCurrentUser = getNameCurrentUser();

			dispatch(fetchJobRequest());

			dispatch(showMessage("Xóa thành công!"));

			emitEvent(
				`<b>${nameCurrentUser}</b> đã xóa một yêu cầu tuyển dụng`,
				`/admin/jobrequest`,
				"JOBREQUEST/DELETED"
			);
		})
		.catch((error) => {
			dispatch({
				type: JOBREQUEST_DELETE,
				message: error.message,
			});

			dispatch(showMessage(error.message, "ERROR"));
		});
};

export const approvalJobRequest = (id) => async (dispatch) => {
	dispatch({
		type: JOBREQUEST_APPROVAL,
		message: "Đang xử lý",
	});

	service
		.approvalJobRequest(id)
		.then((res) => {
			dispatch(fetchJobRequest());

			dispatch(showMessage("Phê duyệt thành công!"));

			emitEvent(
				`<b>${nameCurrentUser}</b> đã phê duyệt một yêu cầu tuyển dụng`,
				`/admin/jobrequest/detail/${id}`,
				"JOBREQUEST/APPROVED"
			);
		})
		.catch((error) => {
			dispatch({
				type: JOBREQUEST_APPROVAL,
				message: error.message,
			});

			dispatch(showMessage(error.message, "ERROR"));
		});
};

export const rejectJobRequest = (id, reason) => async (dispatch) => {
	dispatch({
		type: JOBREQUEST_REJECT,
		message: "Đang xử lý",
	});

	service
		.rejectJobRequest(id, reason)
		.then((res) => {
			dispatch(fetchJobRequest());

			dispatch(showMessage("Từ chối thành công!"));

			emitEvent(
				`<b>${nameCurrentUser}</b> đã từ chối một yêu cầu tuyển dụng`,
				`/admin/jobrequest/detail/${id}`,
				"JOBREQUEST/REJECTED"
			);
		})
		.catch((error) => {
			dispatch({
				type: JOBREQUEST_REJECT,
				message: error.message,
			});

			dispatch(showMessage(error.message, "ERROR"));
		});
};
