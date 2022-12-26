import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showMessage } from "redux/messageBox/actionCreator";
import UserService from "services/UserService";
import genElementsForm from "utils/genElementsForm";

const ChangePassword = () => {
	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();
	const [err, setErr] = useState();
	const { accessToken } = JSON.parse(localStorage.getItem("currentUser"));
	const dispatch = useDispatch();

	const fields = [
		{
			name: "current_password",
			label: "Nhập mật khẩu cũ",
			type: "inputText",
		},
		{ name: "new_password", label: "Nhập mật khẩu mới", type: "inputText" },
		{
			name: "new_password_confirmation",
			label: "Nhập lại mật khẩu mới",
			type: "inputText",
		},
	];
	const service = new UserService();
	const formRender = genElementsForm(fields, control, errors);
	const onHandleSubmit = async (data) => {
		try {
			if (data.new_password !== data.new_password_confirmation) {
				setErr("Mật khẩu không giống nhau ");
			} else {
				await service.changePassword({ ...data, token: accessToken });
				dispatch(showMessage("Đổi mật khẩu thành công"));
				reset();
				setErr("");
			}
		} catch ({ response }) {
			setErr(response.data.message);
		}
	};
	return (
		<Fieldset legend="Đổi mật khẩu" toggleable>
			<form onSubmit={handleSubmit(onHandleSubmit)}>
				<p style={{ color: "red", textAlign: "center" }}>{err}</p>
				<div className="p-fluid p-formgrid p-grid flex-direction align-items">
					{formRender}
				</div>
				<Button
					style={{
						display: "block",
						margin: "0 auto",
						marginTop: "30px",
					}}
					type="submit"
					label="Lưu"
				/>
			</form>
		</Fieldset>
	);
};

export default ChangePassword;
