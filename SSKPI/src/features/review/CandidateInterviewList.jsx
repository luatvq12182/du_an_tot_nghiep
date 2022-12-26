import CustomBreadCrumb from "components/CustomBreadCrumb";
import CustomDataTable from "components/CustomDataTable";
import moment from "moment";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCandidateInterview } from "redux/candidateInterview/action";
import { getCandidateInterviews } from "redux/candidateInterview/selector";
import { fetchInterview } from "redux/interview/actionCreator";
import CandidateInterview from "./CandidateInterview";

const items = [{ label: "Đánh Giá Ứng viên" }, { label: " Đánh giá" }];
const CandidateInterviewList = () => {
	const dispatch = useDispatch();
	const { data: job } = useSelector((state) => state.jobRequest);
	const [isOpen, setIsOpen] = useState(false);
	const { data } = useSelector((state) => state.interview);
	const candidateInterview = useSelector(getCandidateInterviews);
	const { user } = JSON.parse(localStorage.getItem("currentUser"));
	const [dateInterview, setDateInterview] = useState();
	useEffect(() => {
		dispatch(fetchInterview());
		dispatch(getCandidateInterview());
	}, [dispatch]);

	const filter = data.filter((item) => {
		const exist = item.receiver.find((value) => Number(value) === user.id);
		if (exist) {
			return item;
		}
		return "";
	});

	const filterImp = (data) => {
		return data.filter(
			(val) =>
				candidateInterview.find((item) => item.interview_id === val.id)
					?.interview_id !== val.id
		);
	};

	const jobBodyTemplate = (rowData) => {
		return job.map
			? job.map((item) => {
					if (item.id === rowData.job_id) {
						return <p>{item.title}</p>;
					}
					return "";
			  })
			: "";
	};
	const timeBodyTemplate = (rowData) => {
		return (
			<p>
				{moment(rowData.time_start).format("HH:mm, DD/MM/YYYY")}
				{"-"}
				{moment(rowData.time_end).format("HH:mm, DD/MM/YYYY")}
			</p>
		);
	};
	const candidateBodyTemplate = (rowData) => {
		return rowData?.name_candidate?.name;
	};

	const handleCandidateInterView = (data) => {
		setIsOpen(true);
		setDateInterview(data);
	};
	const actionBodyTemplate = (rowData) => {
		return (
			<>
				{moment(rowData.time_end).isBefore() && (
					<Button
						onClick={() => handleCandidateInterView(rowData)}
						label="Đánh giá"
					/>
				)}
			</>
		);
	};

	return (
		<div>
			<Dialog
				visible={isOpen}
				onHide={() => setIsOpen(false)}
				position="top"
				style={{ width: "90%" }}
			>
				<CandidateInterview data={dateInterview} />
			</Dialog>
			<CustomBreadCrumb items={items} />
			<div className="card">
				<CustomDataTable
					dataTable={filterImp(filter)}
					showSearch={true}
					selectionMode="single"
				>
					<Column
						field="job_id"
						header="Yêu cầu tuyển dụng"
						body={jobBodyTemplate}
					></Column>
					<Column
						field=""
						header="Thời gian"
						body={timeBodyTemplate}
						style={{ width: "300px" }}
					></Column>
					<Column field="location" header="Địa điểm"></Column>
					<Column
						field="name_candidate"
						header="Ứng viên"
						body={candidateBodyTemplate}
					></Column>
					<Column
						field=""
						header="Hành động"
						body={actionBodyTemplate}
					></Column>
				</CustomDataTable>
			</div>
		</div>
	);
};

export default CandidateInterviewList;
