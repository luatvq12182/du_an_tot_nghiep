import React from "react";
import { MegaMenu } from "primereact/megamenu";
import { APP_MENU_ITEM } from "constants/appPath";

const SideBar = (props) => {
	return (
		<div className="layout-sidebar">
			<MegaMenu model={APP_MENU_ITEM} orientation="vertical" />
		</div>
	);
};

export default React.memo(SideBar);
