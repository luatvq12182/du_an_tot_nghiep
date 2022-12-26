import { FETCH_CONFIG, CHANGE_CONFIG } from "./constant";

const initialState = {
    theme: "themes/mdc-dark-indigo/theme.css",
    layout: "Horizontal",
    fontFamily: "Inter"
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONFIG:
            return action.data;
    
        case CHANGE_CONFIG:
            return action.data

        default:
            return state;
    }
}

export default reducer;