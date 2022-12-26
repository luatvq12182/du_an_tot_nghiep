import socket from "app/socket";
import { getIdCurrentUser } from "./localStorage";
import formatTime from "./formatTime";

/**
 *
 * @param {string} title
 * @param {string} path
 * @param {string} type
 *
 * @returns tao moi 1 notification
 */

export const emitEvent = (title, path, type) => {
	if (socket.connected) {
		const idCurrentUser = getIdCurrentUser();

		socket.emit("push_notification", {
			title,
			userCreated: idCurrentUser,
			create_at: formatTime.formatShortsDateTime(new Date()),
			path,
			type,
		});
	}
};
