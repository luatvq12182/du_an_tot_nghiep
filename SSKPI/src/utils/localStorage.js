export const getRoleCurrentUser = () => {
	if (localStorage.getItem("currentUser")) {
		const {
			user: { role },
		} = JSON.parse(localStorage.getItem("currentUser"));

		return role;
	}

	return null;
};

export const getNameCurrentUser = () => {
	if (localStorage.getItem("currentUser")) {
		const {
			user: { name },
		} = JSON.parse(localStorage.getItem("currentUser"));

		return name;
	}

	return null;
};

export const getIdCurrentUser = () => {
	if (localStorage.getItem("currentUser")) {
		const {
			user: { id },
		} = JSON.parse(localStorage.getItem("currentUser"));

		return id;
	}

	return null;
};
