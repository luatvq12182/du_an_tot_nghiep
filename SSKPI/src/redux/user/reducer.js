import { STATUS_REQUEST } from "constants/app";
import {
    LOGIN,
    REGISTER,
    GET_LIST_USER,
    UPDATE_USER,
    DELETE_USER,
} from "./constant";

const initialState = {
    data: [],
    currentUser: {},
    status: STATUS_REQUEST.IDLE,
    message: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return state;

        case GET_LIST_USER:
            return {
                data: action.data,
                status: action.status,
                message: action.message,
            };
        case REGISTER:
            {
                return {
                    data: [...state.data, action.payload],
                    status: action.status,
                    message: action.message,
                };
            }
        case UPDATE_USER:
            {
                const filter = state.data.map((item) => {
                    if (item.id === action.payload.id) {
                        return {...item, ...action.payload };
                    }
                    return item;
                });
                return {
                    data: filter,
                    status: action.status,
                    message: action.message,
                };
            }
        case DELETE_USER:
            {
                const filter = state.data.filter(
                    (item) => item.id !== action.payload
                );
                return {
                    data: filter,
                    status: action.status,
                    message: action.message,
                };
            }
        default:
            return state;
    }
};

export default reducer;