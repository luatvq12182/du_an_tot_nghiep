import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

// export default {
// 	formatBirthday: (timestamp, novalue = "") => (timestamp > 0 ? format(timestamp, "DD/MM/YYYY") : novalue),
// 	formatLongDate: timestamp => format(timestamp, "dddd, DD/MM/YYYY"),
// 	formatShortDate: timestamp => format(timestamp, "DD/MM/YYYY"),
// 	formatTime: timestamp => format(timestamp, "HH:mm"),
// 	formatGroupKey: timestamp => format(timestamp, "YYYYMMDD"),
// 	formatTimeDate: timestamp => format(timestamp, "HH:mm DD/MM/YYYY"),
// 	formatDateTime: timestamp => format(timestamp, "DD/MM/YYYY HH:mm"),
// };

export { moment };

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	formatBirthday: (timestamp, novalue = "") =>
		timestamp > 0
			? moment(timestamp).utcOffset(7).format("DD/MM/YYYY")
			: novalue,
	formatLongDate: (timestamp) =>
		moment(timestamp).utcOffset(7).format("dddd, DD/MM/YYYY"),
	formatShortDate: (timestamp) =>
		moment(timestamp).utcOffset(7).format("DD/MM/YYYY"),
	formatShortsDate: (timestamp) =>
		moment(timestamp).utcOffset(7).format("YYYY-MM-DD"),
	formatShortsDateTime: (timestamp) =>
		moment(timestamp).utcOffset(7).format("YYYY-MM-DD HH:mm:ss"),
	formatHour: (timestamp) => 
		moment(timestamp).utcOffset(7).format("HH:mm:ss"),
	formatDateMonth: (timestamp) =>
		moment(timestamp).utcOffset(7).format("DD/MM"),
	formatDate: (timestamp) => moment(timestamp).utcOffset(7).format("DD"),
	formatInputDate: (timestamp) =>
		moment(timestamp).utcOffset(7).format("DD-MM-YYYY"),
	formatDisplayDate: (timestamp) =>
		moment(timestamp).utcOffset(7).format("DD/MM/YYYY"),
	formatTime: (timestamp) => moment(timestamp).utcOffset(7).format("HH:mm"),
	formatMinnis: (timestamp) => moment(timestamp).utcOffset(7).format("mm"),
	formatGroupKey: (timestamp) =>
		moment(timestamp).utcOffset(7).format("YYYYMMDD"),
	formatTimeDate: (timestamp) =>
		moment(timestamp).utcOffset(7).format("HH:mm, DD/MM/YYYY"),
	formatDateTime: (timestamp) =>
		moment(timestamp).utcOffset(7).format("DD/MM/YYYY HH:mm"),
	formatRelativeLongDate: (timestamp) => {
		return moment(timestamp)
			.utcOffset(7)
			.calendar(null, {
				sameDay: "[Hôm nay: ]" + "HH:mm, DD/MM/YYYY",
				nextDay: "[Ngày mai,] DD/MM/YYYY",
				nextWeek: "dddd, DD/MM/YYYY",
				lastDay: "[Hôm qua,] DD/MM/YYYY",
				lastWeek: "dddd, DD/MM/YYYY",
				sameElse: "dddd, DD/MM/YYYY",
			});
	},
	format: (timestamp) => {
		return `${timestamp.slice(8, 10)}/${timestamp.slice(
			5,
			7
		)}/${timestamp.slice(0, 4)}`;
	},
};

export const DefaultFormatString = {
	ISO: "YYYY-MM-DDTHH:mm:ssZ",
	birthday: "DD/MM/YYYY",
	shortDate: "DD/MM/YYYY",
	longDate: "dddd, DD/MM/YYYY",
};

export function format({ date, formartString }) {
	return moment(date).format(formartString);
}

export function getTimeInMilis(date) {
	return moment(date).utc().valueOf();
}

export function startOfDay(date) {
	return moment(date).startOf("day");
}
