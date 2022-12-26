import PERMISSION_BUTTON from "constants/permissionButton";
import { KHONG_TON_TAI } from "constants/app";
import { Button } from "primereact/button";
import { getRoleCurrentUser } from "utils/localStorage";

const PermissionButton = ({ name, ...rest }) => {
	let button = <></>;
	
	if (PERMISSION_BUTTON[name]) {
		const role = getRoleCurrentUser();
		
		const check = PERMISSION_BUTTON[name].indexOf(role);

		if (check !== KHONG_TON_TAI) {
			button = <Button {...rest} />;
		}
	}

	return button;
};

export default PermissionButton;
