import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import CustomBreadCrumb from "components/CustomBreadCrumb";

import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { getApprovedJobRequest } from "redux/jobRequest/selector";
import { getCandidates } from "redux/candidate/selector";
import { createInterview } from "redux/interview/actionCreator";
import { getManagerAndHrManager } from "redux/user/selector";
import { KHONG_TON_TAI, ROUND_INTERVIEW } from "constants/app";
import genElementsForm from "utils/genElementsForm";
import formatTime from "utils/formatTime";
import { compareAfter, compareTimeFromTo } from "utils/compareTime";
import { getIdsCandidate } from "redux/interview/selector";

const items = [{ label: "Lịch phỏng vấn" }, { label: "Tạo lịch phỏng vấn" }];

const FormInsertInterview = (props) => {
	const toast = useRef(null);

	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const {
		control,
		watch,
		formState: { errors },
		reset,
		handleSubmit,
	} = useForm();
	const [loading, setLoading] = useState(false);

	const job = watch("job_id");
	const round_no = watch("round_no");

	const users = useSelector(getManagerAndHrManager).map(user => ({
		...user, 
		name: user.name + ' - ' + user.email
	}));
	const approvedJobRequest = useSelector(getApprovedJobRequest);
	const candidates = useSelector(getCandidates);
	const idCandidates = useSelector(getIdsCandidate);
	const iterviews = useSelector(state => state?.interview?.data)
	let candidateFilter = [];

	if(job && round_no) candidateFilter = candidates
		.filter(candidate => candidate.job_id === job.id && idCandidates.indexOf(candidate?.id) === -1)
		.filter(candidate => Number(candidate.status) === Number(round_no) - 1)
		.map(candidate => ({
			...candidate,
			name: candidate.name + ' - ' + candidate.email
		})
	);

	const fields = [
		{ label: "Tiêu đề", name: "title", type: "inputText" },
		{ label: "Ngày phỏng vấn", name: "date", type: "calender", autoFocus: true, },
		{ label: "Người phỏng vấn", name: "receiver", type: "select", options: users, optionLabel: "name", },
		{ label: "Thời gian bắt đầu", name: "time_start", type: "calender", showTime: true, timeOnly: true, isMindata: false, customClass: "p-field p-col-12 p-md-3" },
		{ label: "Thời gian kết thúc", name: "time_end", type: "calender", showTime: true, timeOnly: true, isMindata: false, customClass: "p-field p-col-12 p-md-3" },
		{ label: "Địa điểm", name: "location", type: "inputText" },
		{ label: "Yêu cầu tuyển dụng", name: "job_id", type: "dropdown", options: approvedJobRequest, optionLabel: "title", },
		{ label: "Vòng phỏng vấn", name: "round_no", type: "dropdown", options: ROUND_INTERVIEW, optionLabel: "title", },
		{ label: "Ứng viên", name: "name_candidate", type: "select", options: candidateFilter, optionLabel: "name", },
	];

	const formRender = genElementsForm(fields, control, errors);

	const onSubmit = (data) => {
		try {
			const date = formatTime.formatShortsDate(data.date);

			if(compareAfter(date + ' 08:00:00', date + ' ' + formatTime.formatHour(data.time_start))) {

				toast.current.show({
					severity: 'warn', 
					summary: 'Thời gian không hợp lệ', 
					detail:	'Thời gian bắt đầu phỏng vấn phải sau 8 giờ sáng!', 
					life: 15000
				});

				return;
			}

			if(compareAfter(date + ' ' + formatTime.formatHour(data.time_end), date + ' 20:00:00')) {
				toast.current.show({
					severity: 'warn', 
					summary: 'Thời gian không hợp lệ', 
					detail:	'Thời gian kết thúc phỏng vấn phải kết thúc trước 8 giờ tối!', 
					life: 15000
				});

				return;
			}

			if(compareAfter(data.time_start, data.time_end)) {
				toast.current.show({
					severity:'warn', 
					summary: 'Thời gian không hợp lệ', 
					detail:'Thời gian bắt đầu phỏng vấn không được nhỏ hơn thời gian kết thúc!', 
					life: 15000
				});

				return;
			}

			let checkDuplicate = false;

			iterviews.forEach((interview) => {
				if(
					compareTimeFromTo(
						interview?.time_start, 
						date + ' ' + formatTime.formatHour(data?.time_start), 
						date + ' ' + formatTime.formatHour(data?.time_end)
						) || compareTimeFromTo(
						date + ' ' + formatTime.formatHour(data?.time_start), 
						interview?.time_start, 
						interview?.time_end
						)
				) {
					data.receiver.forEach(nguoinhan => {
						if(interview?.receiver.indexOf(String(nguoinhan.id)) !== KHONG_TON_TAI) {
							checkDuplicate = true;

							toast.current.show({
								severity:'warn', 
								summary: 'Thời gian không hợp lệ', 
								detail: nguoinhan.name + ' đã có lịch phỏng vấn vào lúc ' + interview?.time_start + ' - ' + interview?.time_end, 
								life: 15000
							});
						}
					})
				}
			})

			if(checkDuplicate) {
				return;
			}

			setLoading(true);

			dispatch(
				createInterview(
					{
						...data,
						time_start: date + " " + formatTime.formatHour(data.time_start),
						time_end: date + " " + formatTime.formatHour(data.time_end),
						date: undefined,
						job_id: data.job_id?.id,
						receiver: data.receiver
							.map((item) => item.id)
							.join(","),
						name_candidate: data.name_candidate
							.map((item) => item.id)
							.join(","),
						totalReceiver: data.receiver
							.map((item) => item.id)
							.join(",")
							.split(",").length,
					},
					() => history.push("/admin/interview"),
					() => setLoading(false)
				)
			);
		} catch (error) {
			return error;
		}
	};

	useEffect(() => {
		if(location.state) {
			const data = location.state;
			const date = data?.time_start.split(" ")[0];
			const job = approvedJobRequest.find(item => item?.id === data.job_id);
			const receiver = users.filter(user => data.receiver_id.indexOf(String(user.id)) !== KHONG_TON_TAI);
			const candidate = candidates.filter(cadi => cadi.id === data?.name_candidate?.id);

			reset({
				title: data?.title,
				location: data?.location,
				date: new Date(Date.parse(date)),
				time_start: new Date(Date.parse(data?.time_start)),
				time_end: new Date(Date.parse(data?.time_end)),
				round_no: data.round_no,
				job_id: job,
				receiver: receiver,
				name_candidate: candidate
			});
		}
	}, [location.state])

	return (
		<>
			<Toast ref={toast} />

			<CustomBreadCrumb items={items} />
			<div className="card">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="p-fluid p-formgrid p-grid">
						{formRender}
					</div>
					<Button
						loading={loading}
						type="submit"
						label="Thêm lịch phỏng vấn"
					/>
				</form>
			</div>
		</>
	);
};

export default FormInsertInterview;
