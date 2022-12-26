export const checkLogin = (store) => (next) => (action) => {
	if (action.payload === "Token has expired") {
		alert("Phiên đăng nhập đã hết hạn!");
		localStorage.removeItem("currentUser");
		window.location.href = "/login";
		return;
	}

	return next(action);
};
