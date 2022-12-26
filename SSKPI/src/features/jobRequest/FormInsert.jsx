import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import genElementsForm from "utils/genElementsForm";
import { getNameCurrentUser } from "utils/localStorage";
import CustomBreadCrumb from "components/CustomBreadCrumb";
import PermissionButton from "components/PermissionButton";
import { insertJobRequest } from "redux/jobRequest/actionCreator";
import formatTime from "utils/formatTime";

const items = [
	{ label: "Yêu cầu tuyển dụng", url: "/admin/jobrequest" },
	{ label: "Thêm yêu cầu" },
];

const FormInsertJobRequest = () => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();
	const {
		control,
		formState: { errors, submitCount },
		handleSubmit,
		reset,
	} = useForm();

	const fields = [
		{
			label: "Tên dự án",
			name: "title",
			type: "inputText",
			autoFocus: true,
			minLength: 5,
		},
		{ label: "Hạn tuyển dụng", name: "deadline", type: "calender" },
		{
			label: "Vị trí tuyển dụng",
			name: "position",
			type: "inputText",
			minLength: 5,
		},
		{ label: "Số lượng tuyển dụng", name: "amount", type: "inputNumber" },
		{ label: "Địa điểm làm việc", name: "location", type: "inputText" },
		{
			label: "Thời gian làm việc",
			name: "working_time",
			type: "inputText",
		},
		{ label: "Mức lương", name: "wage", type: "inputText" },
		{ label: "Đặc điểm của dự án", name: "description", type: "editor" },
		{ label: "Yêu cầu", name: "request", type: "editor" },
	];

	const formRender = genElementsForm(fields, control, errors);

	useEffect(() => {
		const name = getNameCurrentUser();

		reset({ petitioner: name });
	}, [reset]);

	useEffect(() => {
		if(Object.keys(errors).length > 0) {
			const el = Object.keys(errors)[0];
			if(el === "deadline") {
				document.getElementsByName(el)[0].focus();
				return
			}	
			document.getElementById(el).focus();
		}
	}, [submitCount])

	const onSubmit = (data) => {
		setLoading(true);

		dispatch(
			insertJobRequest({...data, deadline: formatTime.formatShortsDate(data.deadline)}, 
			() => { history.push("/admin/jobrequest"); }),
			() => { setLoading(false); }
		);
	};

	return (
		<>
			<CustomBreadCrumb items={items} />
			<div className="card">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="p-fluid p-formgrid p-grid">
						{formRender}
					</div>

					<PermissionButton
						id="buttonSubmit"
						name="insertJobRequest"
						type="submit"
						label="Thêm yêu cầu"
						loading={loading}
					/>
				</form>
			</div>
		</>
	);
};

export default FormInsertJobRequest;
