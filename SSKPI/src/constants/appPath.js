import { Link } from "react-router-dom";
import { getRoleCurrentUser } from "utils/localStorage";
import { HR, HR_MANAGER, INTERVIEWER, MANAGER } from "./app";

export const JOBREQUEST = "/admin/jobrequest";
export const JOBREQUEST_DETAIL = "/admin/jobrequest/detail/:id";
export const JOBREQUEST_CREATE = "/admin/jobrequest/create";
export const JOBREQUEST_EDIT = "/admin/jobrequest/edit/:id";
export const JOBREQUEST_APPROVAL = "/admin/jobrequest/approval/:id";
export const JOBREQUEST_REPORT = "/admin/jobrequest/:id/report";

export const CANDIDATE = "/admin/candidate";
export const CANDIDATE_CREATE = "/admin/candidate/create";
export const CANDIDATE_EDIT = "/admin/candidate/edit/:id";

export const ASSESSMENT = "/admin/assessment";

export const REPORT = "/admin/report";

export const USER = "/admin/user";
export const FEATURE = "/admin/feature";
export const INFO_USER = "/admin/user/infomation";

export const CHANGE_PASSWORD = "/admin/user/change_password";
export const FORGOT_PASSWORD = "/user/forgot_password";
export const RESET_PASSWORD = "/user/rest_password/";

export const INTERVIEW = "/admin/interview";
export const INTERVIEW_CREATE = "/admin/interview/create";

export const CANDIDATE_INTERVIEW_LIST = "/admin/candidate/interview";
export const CANDIDATE_INTERVIEW_SHOW = "/admin/candidate/interview/show";
export const CANDIDATE_INTERVIEW = "/admin/candidate/interview/review";
export const CANDIDATE_INTERVIEW_EDIT = "/admin/candidate/interview/edit/:id";

export const PERMISSION_MENU = [
	{
		id: 1,
		parentMenu: 0,
		name: "Yêu cầu tuyển dụng",
		icon: "pi pi-fw pi-book",
		role: [MANAGER, HR_MANAGER, HR, INTERVIEWER],
	},
	{
		id: 2,
		parentMenu: 1,
		name: "Danh sách yêu cầu",
		path: JOBREQUEST,
		role: [MANAGER, HR_MANAGER, HR, INTERVIEWER],
	},
	{
		id: 3,
		parentMenu: 1,
		name: "Tạo yêu cầu",
		path: JOBREQUEST_CREATE,
		role: [MANAGER],
	},
	{
		id: 4,
		parentMenu: 0,
		name: "Ứng viên",
		icon: "pi pi-fw pi-users",
		role: [HR_MANAGER, HR],
	},
	{
		id: 5,
		parentMenu: 4,
		name: "Danh sách ứng viên",
		path: CANDIDATE,
		role: [HR_MANAGER, HR],
	},
	{
		id: 6,
		parentMenu: 4,
		name: "Tạo nguồn ứng viên",
		path: CANDIDATE_CREATE,
		role: [HR_MANAGER, HR],
	},
	{
		id: 7,
		parentMenu: 0,
		name: "Lịch phỏng vấn",
		icon: "pi pi-fw pi-calendar",
		role: [MANAGER, HR_MANAGER, HR, INTERVIEWER],
	},
	{
		id: 8,
		parentMenu: 7,
		name: "Danh sách lịch phỏng vấn",
		path: INTERVIEW,
		role: [MANAGER, HR_MANAGER, HR, INTERVIEWER],
	},
	{
		id: 9,
		parentMenu: 7,
		name: "Tạo lịch phỏng vấn",
		path: INTERVIEW_CREATE,
		role: [HR_MANAGER, HR],
	},
	{
		id: 10,
		parentMenu: 0,
		name: "Đánh giá ứng viên",
		icon: "pi pi-fw pi-star",
		role: [MANAGER, HR_MANAGER, HR, INTERVIEWER],
	},
	{
		id: 11,
		parentMenu: 10,
		name: "Đánh giá",
		path: CANDIDATE_INTERVIEW_LIST,
		role: [MANAGER, INTERVIEWER],
	},
	{
		id: 12,
		parentMenu: 10,
		name: "Danh sách đã đánh giá",
		path: CANDIDATE_INTERVIEW_SHOW,
		role: [MANAGER, HR_MANAGER, HR, INTERVIEWER],
	},
	{
		id: 13,
		parentMenu: 0,
		name: "Quản lý",
		icon: "pi pi-fw pi-cog",
		role: [HR_MANAGER],
	},
	{
		id: 14,
		parentMenu: 13,
		name: "Quản lý User",
		path: USER,
		role: [HR_MANAGER],
	},
];

export const genAppMenu = (arr) => {
	if (!localStorage.getItem("currentUser")) {
		return;
	}

	const role = getRoleCurrentUser();

	const filterByRole = arr.filter((item) => item.role.indexOf(role) !== -1);
	const filterParentMenu = filterByRole.filter(
		(item) => item.parentMenu === 0
	);
	const appMenu = filterParentMenu.map((parentMenu) => {
		const findSubMenu = filterByRole
			.filter((item) => item.parentMenu === parentMenu.id)
			.map((item) => ({
				template: () => (
					<li key={item.id} className="p-menuitem">
						<Link className="p-menuitem-link" to={item.path}>
							{" "}
							{item.name}{" "}
						</Link>{" "}
					</li>
				),
			}));

		return {
			label: parentMenu.name,
			icon: parentMenu.icon,
			items: [[{ items: findSubMenu }]],
		};
	});

	return appMenu;
};

export const APP_MENU_ITEM = genAppMenu(PERMISSION_MENU);
