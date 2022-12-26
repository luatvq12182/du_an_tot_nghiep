import React, { useEffect } from "react";
import "./login.css";
import logo from "images/logo.png";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { useHistory } from "react-router";
import UserService from "services/UserService";
import { Link } from "react-router-dom";
// import { isLogin } from "../../services/authenticate";

const isLogin = () => {
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	return Boolean(currentUser?.email && currentUser?.accessToken);
};

const Login = () => {
	const history = useHistory();
	const service = new UserService();

	useEffect(() => {
		if (isLogin()) {
			history.push("/admin/dashboard");
		}
	}, [history]);

	const defaultValues = {
		email: "",
		password: "",
	};

	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm({ defaultValues });

	const onSubmit = async (data) => {
		await service
			.login(data)
			.then((res) => {
				localStorage.setItem(
					"currentUser",
					JSON.stringify({
						email: data.email,
						accessToken: res.data.access_token,
						user: res.data.user,
					})
				);

				window.location.href = "/admin/jobrequest";
			})
			.catch((error) => {
				alert(error?.response?.data?.error);
				return;
			});

		// history.push("/admin/dashboard");
	};

	const getFormErrorMessage = (name) => {
		return (
			errors[name] && (
				<small className="p-error">{errors[name].message}</small>
			)
		);
	};

	return (
		<div className="login">
			<div className="p-d-flex p-jc-center">
				<div className="card text-right">
					<h5 className="p-text-center">
						<img src={logo} alt="SSKPI" />
					</h5>
					<form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
						<div className="p-field">
							<span className="p-float-label p-input-icon-right">
								<i className="pi pi-envelope" />
								<Controller
									name="email"
									control={control}
									rules={{
										required: "Không được để trống.",
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
											message:
												"Email không hợp lệ. E.g. example@email.com",
										},
									}}
									render={({ field, fieldState }) => (
										<InputText
											id={field.name}
											{...field}
											className={classNames({
												"p-invalid": fieldState.invalid,
											})}
										/>
									)}
								/>
								<label
									htmlFor="email"
									className={classNames({
										"p-error": !!errors.email,
									})}
								>
									Email*
								</label>
							</span>
							{getFormErrorMessage("email")}
						</div>
						<div className="p-field">
							<span className="p-float-label">
								<Controller
									name="password"
									control={control}
									rules={{ required: "Không được để trống." }}
									render={({ field, fieldState }) => (
										<Password
											id={field.name}
											{...field}
											toggleMask
											className={classNames({
												"p-invalid": fieldState.invalid,
											})}
										/>
									)}
								/>
								<label
									htmlFor="password"
									className={classNames({
										"p-error": errors.password,
									})}
								>
									Password*
								</label>
							</span>
							{getFormErrorMessage("password")}
						</div>
						<Link
							to={"/user/forgot_password"}
							style={{ textDecoration: "none" }}
						>
							{" "}
							Quên mật khẩu ?
						</Link>

						<Button
							type="submit"
							label="Đăng nhập"
							className="p-mt-5"
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
