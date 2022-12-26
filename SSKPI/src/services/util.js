import axios from "axios";
import { REACT_APP_URL_API } from "constants/app";

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

export const Utils = {
	get,
	post,
	postMultipart,
	put,
	del,
};

function get(path, data) {
	const url = _urlRender(path, data);

	return axios.get(url, {
		headers: {
			Authorization: `Bearer ${currentUser?.accessToken}`,
		},
	});
}

function post(path, data) {
	const url = _urlRender(path, null);

	return axios.post(url, data, {
		headers: {
			Authorization: `Bearer ${currentUser?.accessToken}`,
		},
	});
}

function postMultipart(path, data) {
	const url = _urlRender(path, null);

	return axios.post(url, data, {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${currentUser?.accessToken}`,
		},
	});
}

function put(path, data) {
	const url = _urlRender(path, null);

	return axios.put(url, data, {
		headers: {
			Authorization: `Bearer ${currentUser?.accessToken}`,
		},
	});
}

function del(path, data) {
	const url = _urlRender(path, data);

	return axios.delete(url, {
		headers: {
			Authorization: `Bearer ${currentUser?.accessToken}`,
		},
	});
}

function _urlRender(path, data, renderDomain = true) {
	let url = renderDomain
		? REACT_APP_URL_API + (path.indexOf("/") === 0 ? path : "/" + path)
		: path.indexOf("/") === 0
		? path
		: "/" + path;
	if (data) {
		url += "?";
		url = _dataQueryRender(data, url, "").replace(/&$/, "");
	}
	return url;
}

function _dataQueryRender(data, url, prefix) {
	let rUrl = url;
	if (data && data.constructor === Array) {
		for (var key in data) {
			if (data[key] && data[key].constructor === Object) {
				rUrl += _dataQueryRender(
					data[key],
					"",
					prefix ? prefix + "[" + key + "]" : key
				);
			} else {
				rUrl +=
					(prefix ? prefix + "[" + key + "]" : key) +
					"=" +
					(data[key] !== undefined && data[key] !== null
						? encodeURI(data[key])
						: "") +
					"&";
			}
		}
	} else if (data) {
		for (let key in data) {
			if (data[key] && data[key].constructor === Object) {
				rUrl += _dataQueryRender(
					data[key],
					"",
					prefix ? prefix + "." + key : key
				);
			} else if (data[key] && data[key].constructor === Array) {
				rUrl += _dataQueryRender(
					data[key],
					"",
					prefix ? prefix + "." + key : key
				);
			} else {
				rUrl +=
					(prefix ? prefix + "." + key : key) +
					"=" +
					(data[key] !== undefined && data[key] !== null
						? encodeURI(data[key])
						: "") +
					"&";
			}
		}
	}

	return rUrl;
}
