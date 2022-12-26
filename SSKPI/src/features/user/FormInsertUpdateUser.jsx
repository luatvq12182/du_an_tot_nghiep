import InputTextController from "components/InputTextController";
import { Button } from "primereact/button";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AddUser } from "redux/user/actionCreator";
import genElementsForm from "utils/genElementsForm";

const FormInsertUpdateUser = (props) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();
	const [err, setErr] = useState();
	const dispatch = useDispatch();
	const { data: user } = useSelector((state) => state.user);

	const status = [{ status: 1, name: "Hoạt động" }];
	const roles = [
		{ role: 0, name: "Trưởng phòng" },
		{ role: 1, name: "Trưởng phòng nhân sự" },
		{ role: 2, name: "HR" },
		{ role: 3, name: "Người phỏng vấn " },
	];

	const fields = [
		{
			label: "Mã nhân viên",
			name: "employee_code",
			type: "inputText",
			autoFocus: true,
		},
		{ label: "Tên nhân viên", name: "name", type: "inputText" },
		{ label: "Email", name: "email", type: "inputText" },
		{
			label: "Chức vụ",
			name: "role",
			type: "dropdown",
			options: roles,
			optionLabel: "name",
		},
		{
			label: "Trạng thái ",
			name: "status",
			type: "dropdown",
			options: status,
			optionLabel: "name",
		},
	];

	const onSubmit = (data) => {
		const findEmployeeCode = user.find(
			(item) => item.employee_code === data.employee_code
		);
		const findEmail = user.find((item) => item.email === data.email);
		if (data.password !== data.password_confirmation) {
			setErr("Mật khẩu không trùng khớp");
		} else if (findEmployeeCode) {
			setErr("Mã nhân viên đã tồn tại");
		} else if (findEmail) {
			setErr("Email đã tồn tại");
		} else {
			dispatch(
				AddUser({
					...data,
					status: data.status.status,
					roleIds: [data.role.role],
				})
			);
			props.hideDialog();
		}
	};

	const formRender = genElementsForm(fields, control, errors);

	useEffect(() => {
		reset({ status: { status: 1, name: "Hoạt động" } });
	}, [reset]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<p style={{ color: "red", textAlign: "center" }}> {err}</p>
			<div className="p-fluid p-formgrid p-grid">
				{formRender}
				{props.actionType !== "UPDATE" ? (
					<>
						<InputTextController
							label="Mật khẩu"
							name="password"
							control={control}
							errors={errors}
							minLength={6}
						/>
						<div className="p-col-6"></div>
						<InputTextController
							label="Nhập lại mật khẩu"
							name="password_confirmation"
							control={control}
							errors={errors}
							minLength={6}
						/>
					</>
				) : (
					""
				)}
			</div>

			<Button
				style={{
					display: "block",
					margin: "0 auto",
					marginTop: "30px",
				}}
				type="submit"
				label={
					props.actionType === "INSERT"
						? "Thêm nhân viên"
						: "Xác nhận"
				}
			/>
		</form>
	);
};

export default FormInsertUpdateUser;
