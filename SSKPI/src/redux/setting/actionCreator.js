import { FETCH_CONFIG, CHANGE_CONFIG } from "./constant";
import ConfigService from "services/ConfigService";

const service = new ConfigService();

const fetchConfig = async () => {
	try {
		const response = await service.fetchConfig();

		return {
			data: response.data,
			type: FETCH_CONFIG,
		};
	} catch (error) {
		return {
			data: {
				theme: "themes/mdc-dark-indigo/theme.css",
				layout: "Horizontal",
				fontFamily: "Inter",
			},
			type: FETCH_CONFIG,
		};
	}
};

const changeConfig = async () => {
	try {
		const response = await service.changeConfig();

		return {
			data: response.data,
			type: CHANGE_CONFIG,
		};
	} catch (error) {
		return {
			data: {
				theme: "themes/mdc-dark-indigo/theme.css",
				layout: "Horizontal",
				fontFamily: "Inter",
			},
			type: CHANGE_CONFIG,
		};
	}
};

export { fetchConfig, changeConfig };
