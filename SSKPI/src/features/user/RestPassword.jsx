import { FORGOT_PASSWORD } from "constants/appPath";
import { Button } from "primereact/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { showMessage } from "redux/messageBox/actionCreator";
import UserService from "services/UserService";
import genElementsForm from "utils/genElementsForm";

const RestPassword = () => {
	const { search } = useLocation();
	const dispatch = useDispatch();
	const [err, setError] = useState();
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const history = useHistory();

	const fields = [
		{
			name: "password",
			label: "Nhập mật khẩu mới.",
			type: "inputText",
			placeholder: "Mật khẩu",
		},
		{
			name: "password_confirmation",
			label: "Nhập lại mật khẩu mới.",
			type: "inputText",
			placeholder: "Nhập mật khẩu",
		},
	];
	const service = new UserService();
	const formRender = genElementsForm(fields, control, errors);
	const onHandleSubmit = async (data) => {
		try {
			if (data.password === data.password_confirmation) {
				await service.restPassword({
					...data,
					token: search.replace("?token=", ""),
				});
				dispatch(showMessage("Đổi mật khẩu thành công"));
				history.push("/login");
			} else {
				setError("Mật khẩu không khớp. Vui lòng thử lại");
			}
		} catch (error) {}
	};
	return (
		<>
			<h1 style={{ textAlign: "center", marginTop: "10%" }}>
				Vui lòng bạn nhập mật khẩu mới
			</h1>
			<p style={{ color: "red", textAlign: "center" }}>{err}</p>
			<form onSubmit={handleSubmit(onHandleSubmit)}>
				<div className="p-fluid p-formgrid p-grid flex-direction align-items">
					{formRender}
				</div>
				<div
					className="flex"
					style={{ width: "150px", margin: "0 auto" }}
				>
					<>
						<Button
							style={{
								display: "block",
								margin: "0 auto",
								marginTop: "30px",
							}}
							type="submit"
							label="Lưu"
						/>
						<Button
							style={{
								display: "block",
								margin: "0 auto",
								marginTop: "30px",
							}}
							onClick={() => history.push(FORGOT_PASSWORD)}
							label="Quay lại"
						/>
					</>
				</div>
			</form>
		</>
	);
};

export default RestPassword;
