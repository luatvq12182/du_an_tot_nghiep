import { CANDIDATE_INTERVIEW_SHOW } from "constants/appPath";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { createCandidateInterview } from "redux/candidateInterview/action";
import { editInterview } from "redux/interview/actionCreator";
import genElementsForm from "utils/genElementsForm";
import "./style.scss";

const { user } = JSON.parse(localStorage.getItem("currentUser"));

const CandidateInterview = ({ data: item }) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();

	const option = [
		{ id: 1, name: "1" },
		{ id: 2, name: "2" },
		{ id: 3, name: "3" },
		{ id: 4, name: "4" },
		{ id: 5, name: "5" },
	];
	const result = [
		{ id: "Pass", name: "Pass" },
		{ id: "Fail", name: "Fail" },
		{ id: "Phỏng vấn tiếp", name: "Phỏng vấn tiếp" },
	];

	const fields = [
		{
			label: "Hệ thống,logic",
			name: "thinking",
			type: "dropdown",
			options: option,
			autoFocus: true,
		},
		{
			label: "Kiên trì bền bỉ",
			name: "persistent_perseverance",
			options: option,
			type: "dropdown",
		},
		{
			label: "Đam mê mục tiêu rõ ràng",
			name: "career_goals",
			options: option,
			type: "dropdown",
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
			optionLabel: "name",
		},
		{
			label: "Tiếng anh",
			name: "english",
			type: "dropdown",
			options: option,
			optionLabel: "name",
		},
		{
			label: "Khả năng thích ứng ",
			name: "adaptability",
			type: "dropdown",
			options: option,
			optionLabel: "name",
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

	const onSubmit = (data) => {
		dispatch(
			createCandidateInterview({
				...data,
				thinking: data.thinking.id,
				persistent_perseverance: data.persistent_perseverance.id,
				career_goals: data.career_goals.id,
				specialize_skill: data.specialize_skill.id,
				english: data.english.id,
				adaptability: data.adaptability.id,
				result: data.result.id,
				candidate_id: item.name_candidate.id,
				interview_id: item.id,
				time_start: item.time_start,
				time_end: item.time_end,
				user_id: user?.id,
				email: user?.name,
			})
		);
		dispatch(
			editInterview({
				...item,
				receiver: item.receiver.join(),
				name_candidate: item.name_candidate.id,
				totalReceiver: item.totalReceiver - 1,
			})
		);
		history.push(CANDIDATE_INTERVIEW_SHOW);
		reset();
	};

	const formRender = genElementsForm(fields, control, errors);

	return (
		<>
			<h3 style={{ textAlign: "center" }}>Đánh giá</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="p-fluid p-formgrid p-grid">{formRender}</div>
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
		</>
	);
};

export default CandidateInterview;
