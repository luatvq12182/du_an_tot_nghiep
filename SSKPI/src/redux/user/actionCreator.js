import UserService from "services/UserService";
import { STATUS_REQUEST } from "constants/app";
import {
	LOGIN,
	REGISTER,
	GET_LIST_USER,
	UPDATE_USER,
	DELETE_USER,
} from "./constant";
import { showMessage } from "redux/messageBox/actionCreator";

const service = new UserService();

export const login = (data) => (dispatch) => {
	dispatch({
		type: LOGIN,
		status: STATUS_REQUEST.LOADING,
		data: [],
		currentUser: {},
	});

	service
		.login(data)
		.then((res) => {
			dispatch({
				type: LOGIN,
				status: STATUS_REQUEST.SUCCEEDED,
				data: res.data,
				currentUser: {},
			});
		})
		.catch((error) => {
			dispatch({
				type: LOGIN,
				status: STATUS_REQUEST.ERROR,
				data: error?.response?.data.message,
				currentUser: {},
			});
		});
};

export const getListUsers = () => (dispatch) => {
	dispatch({
		type: GET_LIST_USER,
		status: STATUS_REQUEST.LOADING,
		data: [],
		currentUser: {},
	});

	service
		.getListUser()
		.then((res) => {
			dispatch({
				type: GET_LIST_USER,
				status: STATUS_REQUEST.SUCCEEDED,
				data: res.data,
				currentUser: {},
			});
		})
		.catch((error) => {
			dispatch({
				type: GET_LIST_USER,
				status: STATUS_REQUEST.ERROR,
				data: error?.response?.data.message,
				currentUser: {},
			});
		});
};

export const AddUser = (data) => async (dispatch) => {
	try {
		const res = await service.register(data);
		dispatch({ type: REGISTER, payload: res.data.data });
		dispatch(showMessage("Thêm user thành công!"));
	} catch (error) {
		dispatch({
			type: REGISTER,
			status: STATUS_REQUEST.ERROR,
			data: error?.response?.data.message,
			currentUser: {},
		});
		dispatch(showMessage("Thêm user thất bại!", error));
	}
};
export const RemoveUser = (id) => async (dispatch) => {
	try {
		await service.deleteUser(id);
		dispatch({ type: DELETE_USER, payload: id });
		dispatch(showMessage("Xoas thành công!"));
	} catch (error) {}
};
export const DisableUser = (id, item) => async (dispatch) => {
	try {
		const res = await service.disableMember(id, item);
		dispatch({ type: UPDATE_USER, payload: res.data });
	} catch (error) {
		dispatch({
			type: UPDATE_USER,
			status: STATUS_REQUEST.ERROR,
			data: error?.response?.data.message,
			currentUser: {},
		});
		dispatch(showMessage("Sửa user thất bại!", error));
	}
};
export const updateUser = (data) => async (dispatch) => {
	try {
		const res = await service.updateUser(data);
		dispatch({ type: UPDATE_USER, payload: res.data });
		dispatch(showMessage("Sửa user thành công!"));
	} catch (error) {
		dispatch({
			type: UPDATE_USER,
			status: STATUS_REQUEST.ERROR,
			data: error?.response?.data.message,
			currentUser: {},
		});
		dispatch(showMessage("Sửa user thất bại!", error));
	}
};
