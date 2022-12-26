import {
    DELETE_USER,
    GET_DETAIL_USER,
    GET_LIST_USER,
    LOGIN,
    REGISTER,
    UPDATE_USER,
    DISABLE_MEMBER,
    CHANGE_PASSWORD,
    FORGOT_PASSWORD,
    REST_PASSWORD,
} from "constants/apiPath";
import { Utils } from "./util";

export default class UserService {
    login(data) {
        return Utils.post(LOGIN, data);
    }

    getListUser = () => {
        return Utils.get(GET_LIST_USER);
    };

    /**
     *
     * @param {number} id
     * @returns trả về user đang đăng nhập
     */

    getDetailUser = (id) => {
        return Utils.get(GET_DETAIL_USER + id);
    };

    register(data) {
        return Utils.post(REGISTER, data);
    }

    updateUser = (data) => {
        return Utils.post(UPDATE_USER + data.id, data);
    };

    deleteUser = (id) => {
        return Utils.del(DELETE_USER + id);
    };
    disableMember = (id, status) => {
        return Utils.post(DISABLE_MEMBER + id, { status });
    };
    changePassword = (data) => {
        return Utils.post(CHANGE_PASSWORD, data);
    };
    forgotPassword = (data) => {
        return Utils.post(FORGOT_PASSWORD, data);
    };
    restPassword = (data) => {
        return Utils.post(REST_PASSWORD, data);
    };
}