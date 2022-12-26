import React, { useEffect, useRef, useState } from "react";
import socket from "./socket";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import logo from "images/logo.png";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
// import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { iconStyle } from "styles/icon.style";
import { MegaMenu } from "primereact/megamenu";
import { APP_MENU_ITEM } from "constants/appPath";
import NotificationList from "./NotificationList";
import {
	getIdCurrentUser,
	getNameCurrentUser,
	getRoleCurrentUser,
	// getRoleCurrentUser,
} from "utils/localStorage";
import { NODEJS } from "constants/app";
import { useSelector } from "react-redux";
// import { NODEJS } from "constants/app";
const sound = require("./sound.mp3");

// const notifications = [];

const TopBar = (props) => {
	const history = useHistory();
	const [notifications, setNotifications] = useState([]);
	const [visible, setVisible] = useState(false);
	const jobRequest = useSelector((state) => state.jobRequest.data);

	const playSound = () => {
		const audio = new Audio(sound.default);

		audio.play();
	};

	const getNoti = async () => {
		const requests = {};
		jobRequest.forEach((item) => (requests[item?.id] = item));

		const res = await fetch(NODEJS + "api/node/notifications", {
			method: "post",
			body: JSON.stringify({
				id: getIdCurrentUser(),
				role: getRoleCurrentUser(),
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		let data = await res.json();

		data = data.filter((item) => {
			if (
				["JOBREQUEST/APPROVED", "JOBREQUEST/REJECTED"].indexOf(
					item.type
				) !== -1
			) {
				const idJob = item.path.split("/")[4];

				const idCurrentUser = getIdCurrentUser();

				if (idCurrentUser == requests[idJob]?.petitioner?.id)
					return true;

				return false;
			}

			return true;
		});

		setNotifications(data);
	};

	useEffect(() => {
		getNoti();

		document.addEventListener("click", () => {
			setVisible(false);
		});
	}, [jobRequest]);

	useEffect(() => {
		socket.on("res_notification", async (data) => {
			const idCurrentUser = getIdCurrentUser();

			if (data.userCreated !== idCurrentUser) {
				playSound();

				const requests = {};
				jobRequest.forEach((item) => (requests[item?.id] = item));

				const res = await fetch(NODEJS + "api/node/notifications", {
					method: "post",
					body: JSON.stringify({
						id: getIdCurrentUser(),
						role: getRoleCurrentUser(),
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});
				let data = await res.json();

				data = data.filter((item) => {
					if (
						["JOBREQUEST/APPROVED", "JOBREQUEST/REJECTED"].indexOf(
							item.type
						) !== -1
					) {
						const idJob = item.path.split("/")[4];

						const idCurrentUser = getIdCurrentUser();

						if (idCurrentUser == requests[idJob]?.petitioner?.id)
							return true;

						return false;
					}

					return true;
				});

				setNotifications(data);
			}
		});
	}, []);

	const menu = useRef(null);
	const itemsAccount = [
		{
			label: "Thông tin tài khoản",
			command: (e) => {
				history.push("/admin/user/infomation");
			},
		},
		{
			label: "Đổi mật khẩu",
			command: (e) => {
				history.push("/admin/user/change_password");
			},
		},
		{
			label: "Đăng xuất",
			command: (e) => {
				localStorage.removeItem("currentUser");
				history.push("/login");
			},
		},
	];

	const handleClick = (e) => {
		e.stopPropagation();
		setVisible(!visible);
	};

	return (
		<>
			<div className="layout-topbar">
				<Link to="/">
					<img src={logo} alt="SSKPI" />
				</Link>

				<ul className="topbar-menu">
					<li style={{ position: "relative", cursor: "pointer" }}>
						<i
							onClick={handleClick}
							className="pi pi-bell p-overlay-badge"
							style={iconStyle}
						>
							{notifications.length > 0 && (
								<Badge value={notifications.length} />
							)}
						</i>
						{visible && (
							<NotificationList notifications={notifications} />
						)}
					</li>

					<li style={{ width: "auto" }}>
						<Menu
							model={itemsAccount}
							popup
							ref={menu}
							id="popup_menu"
						/>
						<Button
							label={"Hi, " + getNameCurrentUser()}
							onClick={(event) => menu.current.toggle(event)}
							aria-controls="popup_menu"
							aria-haspopup
						/>
					</li>
				</ul>
			</div>
			{props.layout.name === "Horizontal" && (
				<MegaMenu
					style={{
						padding: "5px",
					}}
					model={APP_MENU_ITEM}
				/>
			)}
		</>
	);
};

export default React.memo(TopBar);
