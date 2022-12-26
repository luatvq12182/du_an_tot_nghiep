import CustomBreadCrumb from "components/CustomBreadCrumb";
import { CANDIDATE_INTERVIEW_SHOW } from "constants/appPath";
import { Button } from "primereact/button";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { editCandidateInterview } from "redux/candidateInterview/action";
import { getCandidateInterviews } from "redux/candidateInterview/selector";
import genElementsForm from "utils/genElementsForm";
import "./style.scss";

const items = [{ label: "Đánh Giá Ứng viên" }, { label: "Sửa Đánh giá" }];
const EditCandidateInterview = () => {
	const { id } = useParams();
	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();
	const candidateInterview = useSelector(getCandidateInterviews);
	const dispatch = useDispatch();
	const history = useHistory();
	const option = [
		{ id: 1, value: 1 },
		{ id: 2, value: 2 },
		{ id: 3, value: 3 },
		{ id: 4, value: 4 },
		{ id: 5, value: 5 },
	];
	const result = [
		{ name: "Pass", value: "Pass" },
		{ name: "Fail", value: "Fail" },
		{ name: "Phỏng vấn tiếp", value: "Phỏng vấn tiếp" },
	];

	const fields = [
		{
			label: "Hệ thống,logic",
			name: "thinking",
			type: "dropdown",
			options: option,
			autoFocus: true,
			optionLabel: "id",
		},
		{
			label: "Kiên trì bền bỉ",
			name: "persistent_perseverance",
			options: option,
			type: "dropdown",
			optionLabel: "id",
		},
		{
			label: "Đam mê mục tiêu rõ ràng",
			name: "career_goals",
			options: option,
			type: "dropdown",
			optionLabel: "id",
		},
		{
			label: "Thời gian có thể onboard",
			name: "time_onbroad",
			type: "calender",
		},
		{
			label: "Chuyên môn",
			name: "specialize_skill",
			type: "dropdown",
			options: option,
			optionLabel: "id",
		},
		{
			label: "Tiếng anh",
			name: "english",
			type: "dropdown",
			options: option,
			optionLabel: "id",
		},
		{
			label: "Khả năng thích ứng ",
			name: "adaptability",
			type: "dropdown",
			options: option,
			optionLabel: "id",
		},
		{
			label: "Kết quả",
			name: "result",
			type: "dropdown",
			options: result,
		},

		{
			label: "Nhận xét",
			name: "reviews",
			type: "editor",
		},
	];
	useEffect(() => {
		const find = candidateInterview.find((item) => item.id === Number(id));
		reset({
			...find,
			time_onbroad: new Date(Date.parse(find?.time_onbroad)),
		});
	}, [candidateInterview, id, reset]);

	const formRender = genElementsForm(fields, control, errors);
	const onSubmit = (data) => {
		if (!data) {
			return "";
		}
		dispatch(editCandidateInterview(data));
		history.push(CANDIDATE_INTERVIEW_SHOW);
	};
	return (
		<>
			<CustomBreadCrumb items={items} />
			<div className="card">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="p-fluid p-formgrid p-grid">
						{formRender}
					</div>
					<Button
						style={{
							display: "block",
							margin: "0 auto",
							marginTop: "30px",
						}}
						type="submit"
						label={"Lưu"}
					/>
				</form>
			</div>
		</>
	);
};

export default EditCandidateInterview;
