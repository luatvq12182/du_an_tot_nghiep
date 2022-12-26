import { NODEJS } from "constants/app";
import { io } from "socket.io-client";
import { getIdCurrentUser, getRoleCurrentUser } from "utils/localStorage";

const socket = io(NODEJS, {
	path: "/sskpi/",
});

const id = getIdCurrentUser();
const role = getRoleCurrentUser();

socket.emit("subscribe", { id, role });

export default socket;
