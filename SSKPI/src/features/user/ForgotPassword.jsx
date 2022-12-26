import { FORGOT_PASSWORD } from "constants/appPath";
import { Button } from "primereact/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { showMessage } from "redux/messageBox/actionCreator";
import UserService from "services/UserService";
import genElementsForm from "utils/genElementsForm";

const ForgotPassword = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [error, setError] = useState();
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const fields = [
		{
			name: "email",
			label: "Vui lòng nhập email  để tìm kiếm tài khoản của bạn.",
			type: "inputText",
			placeholder: "Nhập email",
		},
	];
	const service = new UserService();
	const formRender = genElementsForm(fields, control, errors);
	let err;
	const onHandleSubmit = async (data) => {
		try {
			await service.forgotPassword({
				...data,
				site_url: `http://localhost:8080/user/rest_password`,
				original_url: `http://localhost:8080${FORGOT_PASSWORD}`,
			});
			dispatch(showMessage("Bạn vui lòng check mail ?"));
		} catch ({ response }) {
			setError(response?.data?.message?.[0]);
		}
	};
	return (
		<>
			<h1 style={{ textAlign: "center", marginTop: "10%" }}>
				Tìm tài khoản của bạn
			</h1>
			<p style={{ textAlign: "center", color: "red" }}>{error}</p>
			<form onSubmit={handleSubmit(onHandleSubmit)}>
				<div className="p-fluid p-formgrid p-grid flex-direction align-items">
					{formRender}
				</div>
				<div
					className="flex"
					style={{ width: "150px", margin: "0 auto" }}
				>
					<Button
						style={{
							display: "block",
							margin: "0 auto",
							marginTop: "30px",
						}}
						type="submit"
						label="Gửi"
					/>
					<Button
						style={{
							display: "block",
							margin: "0 auto",
							marginTop: "30px",
						}}
						onClick={() => history.push("/login")}
						label="Quay lại"
					/>
				</div>
			</form>
		</>
	);
};

export default ForgotPassword;
