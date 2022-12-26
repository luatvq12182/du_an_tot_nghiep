import { Button } from "primereact/button";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateUser } from "redux/user/actionCreator";
import "../candidate/style.scss";

const UpdateUser = ({ user }) => {
	const {
		formState: { errors },
		handleSubmit,
		reset,
		register,
	} = useForm();
	const dispatch = useDispatch();
	const roles = [
		{ role: 0, name: "Trưởng phòng" },
		{ role: 1, name: "Trưởng phòng nhân sự" },
		{ role: 2, name: "HR" },
		{ role: 3, name: "Người phỏng vấn " },
	];
	useEffect(() => {
		const newData = { ...user, roles: user?.roles?.[0]?.id };
		reset({ ...newData });
	}, []);
	const onHandleSubmit = (data) => {
		dispatch(updateUser({ ...data, roleIds: [data.roles] }));
	};
	return (
		<div className="card">
			<form action="" onSubmit={handleSubmit(onHandleSubmit)}>
				<div className="gird p-fluid">
					<div className="candidate_left">
						<div>
							<label htmlFor="employee_code">Mã nhân viên*</label>
							<br />
							<input
								type="text"
								{...register("employee_code", {
									required: true,
									minLength: 5,
								})}
							/>
							{errors.employee_code && (
								<span
									style={{
										color: "red",
										marginBottom: "7px",
									}}
								>
									Bắt buộc phải nhập.
								</span>
							)}
						</div>
						<div>
							<label htmlFor="name">Tên nhân viên*</label>
							<br />
							<input
								type="text"
								{...register("name", {
									required: false,
									minLength: 5,
								})}
							/>
							{errors.name && (
								<span
									style={{
										color: "red",
										marginBottom: "7px",
									}}
								>
									Trường này không đựợc để trống và phải lớn
									hơn 5 ký tự
								</span>
							)}
						</div>
						<div>
							<label htmlFor="email">Email*</label>
							<br />
							<input
								name="email"
								id=""
								{...register("email")}
								// disabled
								readOnly
							></input>
							{errors.email && (
								<span
									style={{
										color: "red",
										marginBottom: "7px",
									}}
								>
									Trường này không đựơc để trống .
								</span>
							)}
						</div>
					</div>
					<div className="candidate_right">
						<div>
							<label htmlFor="roles">Chức vụ*</label>
							<br />
							<select
								name="roles"
								id=""
								{...register("roles", { required: true })}
							>
								<option value="">Chọn chức vụ</option>
								{roles.map((item) => (
									<option value={item.role}>
										{item.name}
									</option>
								))}
							</select>
							{errors.roles && (
								<span
									style={{
										color: "red",
										marginBottom: "7px",
									}}
								>
									Trường này không đựơc để trống .
								</span>
							)}
						</div>
						<div>
							<label htmlFor="status">Trạng thái *</label>
							<br />
							<select
								name="status"
								id=""
								{...register("status", { required: true })}
							>
								<option value="1">Hoạt động</option>
								<option value="0">Ngừng hoạt động</option>
							</select>
							{errors.status && (
								<span
									style={{
										color: "red",
										marginBottom: "7px",
									}}
								>
									Bắt buộc phải nhập.
								</span>
							)}
						</div>
					</div>
				</div>
				<center>
					{" "}
					<Button type="submit" label={"Xác nhận"} />
				</center>
			</form>
		</div>
	);
};

export default UpdateUser;
