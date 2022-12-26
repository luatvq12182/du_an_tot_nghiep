import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import CustomBreadCrumb from "components/CustomBreadCrumb";
import { useHistory } from "react-router";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { addCandidate } from "redux/candidate/action";
import { getJobRequest, getStatusJobRequest } from "redux/jobRequest/selector";
import { fetchJobRequest } from "redux/jobRequest/actionCreator";
import { ERROR_FORM_MESSAGE, STATUS_REQUEST } from "constants/app";
import { CANDIDATE } from "constants/appPath";
import { useState } from "react";
import { Dialog } from "primereact/dialog";

const CandidateCreat = () => {
	const items = [
		{ label: "Ứng viên", url: CANDIDATE },
		{ label: " Thêm ứng viên" },
	];
	const history = useHistory();
	const dispatch = useDispatch();
	const status = useSelector(getStatusJobRequest);
	const data = useSelector(getJobRequest);
	const [errCV, setErrCV] = useState();
	const [errImg, setErrImg] = useState();
	const [errEmail, setErrEmail] = useState();
	const { cadidate } = useSelector((state) => state.cadidate);
	const [showMessage, setShowMessage] = useState(false);
	const [idCandidate, setIdCandidate] = useState();
	useEffect(() => {
		if (status === STATUS_REQUEST.IDLE) {
			dispatch(fetchJobRequest());
		}
	}, [dispatch, status]);

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({});

	let formData = new FormData();

	const onHandleSubmit = (data) => {
		if (
			(data.image[0] && data.image[0].type === "image/jpeg") ||
			(data.image[0] && data.image[0].type === "image/png")
		) {
			setErrImg("");
			formData.append("image", data.image[0]);
		} else if (
			(data.image[0] && data.image[0].type !== "image/jpeg") ||
			(data.image[0] && data.image[0].type !== "image/png")
		) {
			setErrImg("Hình ảnh không đúng định dạng 'jpg/png'");
		}
		if (
			data.cv[0].type === "application/pdf" ||
			data.cv[0].type === "application/doc" ||
			data.cv[0].type ===
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
		) {
			setErrCV("");
			formData.append("cv", data.cv[0]);
		} else {
			setErrCV("CV không đúng với định dạng 'pdf,doc,docx'");
		}
		const findEmail = cadidate.find((item) => item.email === data.email);
		if (findEmail) {
			setIdCandidate(findEmail?.id);
			setErrEmail("Email đã tồn tại");
			setShowMessage(true);
		} else {
			formData.append("email", data.email);
			setErrEmail("");
		}
		formData.append("name", data.name);
		formData.append("phone", data.phone);
		formData.append("source", data.source);
		formData.append("experience", data.experience);
		formData.append("school", data.school);
		formData.append("job_id", data.job_id);
		formData.append("status", data.status);
		if (errCV === "" || errImg === "" || !findEmail) {
			dispatch(addCandidate(formData));
			setTimeout(() => {
				history.push(CANDIDATE);
			}, 2000);
			reset();
		}
	};
	const dialogFooter = (
		<div className="p-d-flex p-jc-center">
			<Button
				label="Cập nhật"
				onClick={() =>
					history.push(`/admin/candidate/edit/${idCandidate}`)
				}
			/>
			<Button
				label="Quay lại"
				className="p-button-text"
				onClick={() => setShowMessage(false)}
			/>
		</div>
	);

	return (
		<>
			<Dialog
				visible={showMessage}
				onHide={() => setShowMessage(false)}
				position="top"
				footer={dialogFooter}
				style={{ width: "25%" }}
			>
				<div className="container">
					Đã tồn tạo ứng viên này . Bạn muốn cập nhât thông tin ứng
					viên đó không ?
				</div>
			</Dialog>
			<CustomBreadCrumb items={items} />
			<div className="card">
				<form onSubmit={handleSubmit(onHandleSubmit)}>
					<div className="gird">
						<div className="candidate_left">
							<div>
								<label htmlFor="name">Họ và tên*</label>
								<br />
								<input
									type="text"
									{...register("name", {
										required: true,
										minLength: {
											value: 5,
											message:
												ERROR_FORM_MESSAGE.MIN_LENGTH +
												5 +
												" kí tự",
										},
									})}
								/>
								{errors.name && (
									<span
										style={{
											color: "red",
											marginBottom: "7px",
										}}
									>
										Không được để trống và lớn hơn 5 ký tự.
									</span>
								)}
							</div>
							<div style={{ marginTop: "3px" }}>
								<label htmlFor="phone">Số điện thoại*</label>
								<br />
								<input
									type="text"
									{...register("phone", {
										required: true,
										pattern:
											/((09|03|07|08|05)+([0-9]{8})\b)/g,
									})}
								/>
								{errors.phone && (
									<span
										style={{
											color: "red",
											marginBottom: "7px",
										}}
									>
										Trường này không đựợc để trống hoặc sai
										định dạng
									</span>
								)}
							</div>
							<div style={{ marginTop: "5px" }}>
								<label htmlFor="email">Email*</label>
								<br />
								<input
									type="text"
									{...register("email", {
										required: true,
										pattern:
											/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									})}
								/>
								<a href style={{ color: "red" }}>
									{errEmail}
								</a>
								{errors.email && (
									<span
										style={{
											color: "red",
											marginBottom: "7px",
										}}
									>
										Trường này không đựơc để trống hoặc sai
										định dạng
									</span>
								)}
							</div>
							<div>
								<label htmlFor="experience">Kinh nghiệm*</label>
								<br />
								<input
									type="number"
									{...register("experience", {
										required: true,
										min: {
											value: 0,
											message:
												"Số năm kinh nghiêm không được nhỏ hơn 0",
										},
										max: 99,
									})}
								/>

								{errors.experience && (
									<span
										style={{
											color: "red",
											marginBottom: "7px",
										}}
									>
										Số năm kinh nghiêm không được để trống
										và lớn hơn 0.
									</span>
								)}
							</div>
							<div>
								<label htmlFor="school">Trường*</label>
								<br />
								<input
									type="text"
									{...register("school", {
										required: true,
										minLength: 5,
									})}
								/>
								{errors.school && (
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
						<div className="candidate_right">
							<div>
								<label htmlFor="lastname6">Thêm ảnh</label>
								<br />
								<input
									type="file"
									id="image"
									{...register("image")}
								/>
								<a href style={{ color: "red" }}>
									{errImg}
								</a>
							</div>
							<div>
								<label htmlFor="lastname6">CV*</label>
								<br />
								<input
									type="file"
									id="cv"
									{...register("cv", { required: true })}
								/>
								<a href style={{ color: "red" }}>
									{errCV}
								</a>
								{errors.cv && (
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
								<label htmlFor="status">Trạng thái*</label>
								<br />
								<select
									name=""
									id=""
									{...register("status", { required: true })}
								>
									<option value="0">Sắp xếp PV</option>
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
							<div style={{ marginTop: "5px" }}>
								<label htmlFor="source">Nguồn*</label>
								<br />
								<select
									name=""
									id=""
									{...register("source", { required: true })}
								>
									<option value="">Chọn nguồn</option>
									<option value="Vnws">Vnws</option>
									<option value="Top CV">Top CV</option>
									<option value="Tìm việc nhanh">
										Tìm việc nhanh
									</option>
									<option value="IT việc">IT việc</option>
									<option value="University campaign">
										University campaign
									</option>
									<option value="Network">Network</option>
								</select>
								{errors.source && (
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
							<div style={{ margin: "3px 0" }}>
								<label>Dự án*</label>
								<br />
								<select
									name=""
									id=""
									{...register("job_id", { required: true })}
								>
									<option value=""> Chọn dự án </option>
									{data.map
										? data.map((item) => {
												if (item.status === 2) {
													return (
														<option value={item.id}>
															{item.title} - [
															{item.position}]
														</option>
													);
												}
												return "";
										  })
										: ""}
								</select>
								{errors.job_id && (
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
						<Button label="Thêm ứng viên" type="submit" />
					</center>
				</form>
			</div>
		</>
	);
};

export default CandidateCreat;
