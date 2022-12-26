import { InputText } from "primereact/inputtext";
import { Fieldset } from "primereact/fieldset";
import { POSITION } from "constants/app";
import { useEffect, useState } from "react";
import UserService from "services/UserService";

const UserDetail = () => {
	const userApi = new UserService();
	const [userI, setUserI] = useState();

	useEffect(() => {
		async function fetchData() {
			const { user } = JSON.parse(localStorage.getItem("currentUser"));
			try {
				const { data } = await userApi.getDetailUser(user?.id);
				setUserI(data);
			} catch (error) {}
		}
		fetchData();
	}, []);

	const fields = [
		{ name: "name", label: "Họ tên", value: userI?.name },
		{
			name: "employee_code",
			label: "Mã nhân viên",
			value: userI?.employee_code,
		},
		{ name: "email", label: "Email", value: userI?.email },

		{
			name: "role",
			label: "Chức vụ",
			value: POSITION[userI?.roles?.[0].id],
		},
	];

	return (
		<Fieldset legend="Thông tin tài khoản" toggleable>
			<form>
				<div className="p-grid">
					{fields.map(({ name, label, value }) => {
						return (
							<>
								<div key={name} className="p-col-6">
									<label
										style={{
											marginBottom: "5px",
											display: "block",
										}}
									>
										{label}
									</label>
									<InputText
										disabled
										style={{ width: "100%" }}
										defaultValue={value || ""}
									/>
								</div>
							</>
						);
					})}
				</div>
			</form>
		</Fieldset>
	);
};

export default UserDetail;
