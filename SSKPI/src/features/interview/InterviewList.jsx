import CustomBreadCrumb from "components/CustomBreadCrumb";
import CustomDataTable from "components/CustomDataTable";
import PermissionButton from "components/PermissionButton";
import { STATUS_REQUEST } from "constants/app";
import { INTERVIEW_CREATE } from "constants/appPath";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
// import { fetchInterview } from "redux/interview/actionCreator";
import { getInterviews, getStatusInterview } from "redux/interview/selector";
import { genColumns, genStyle } from "utils/genColumns";
import InterviewDetail from "./InterviewDetail";



const InterviewList = () => {
	const [visible, setVisible] = useState(false);
	const [interviewDetail, setInterviewDetail] = useState(null);

	const statusInterview = useSelector(getStatusInterview);
	const interviews = useSelector(getInterviews);
	const history = useHistory();

	const items = [
		{ label: "Lịch phỏng vấn" },
		{ label: "Danh sách lịch phỏng vấn" },
	];

	const handleViewDetail = (data) => {
		setVisible(true);

		setInterviewDetail(data);
	}
	
	const genActionCol = (data) => {
		return (
			<>
				<Button
					tooltip="Xem chi tiết"
					onClick={() => handleViewDetail(data)}
					className="p-button-rounded p-button-text p-button-info"
					icon="pi pi-eye"
				/>
				<PermissionButton
					name="insertInterview"
					icon="pi pi-copy"
					className="p-button-rounded p-button-text p-button-success"
					tooltip="Nhân bản lịch"
					onClick={() => history.push({ 
						pathname: INTERVIEW_CREATE, 
						state: data
					})}
				/>
			</>
		);
	};

	const cols = [
		{ field: "job_name", header: "Dự án", style: genStyle("250px", false) },
		{ field: "round_no", header: "Vòng", style: genStyle("50px") },
		{ field: "location", header: "Địa điểm", style: genStyle("150px", false) },
		{ field: "time_interview", header: "Thời gian", style: genStyle("250px") },
		{ field: "candidate_name", header: "Ứng viên", style: genStyle("150px", false) },
		{ field: "receiver", header: "Người phỏng vấn", style: genStyle("250px", false) },
		{ field: "action", body: genActionCol, header: <i className="pi pi-cog" />, style: genStyle("100px") },
	];

	const columns = genColumns(cols);

	return (
		<>
			<CustomBreadCrumb items={items} />

			<Dialog header="Thông tin lịch phỏng vấn" visible={visible} style={{ width: '80%' }} onHide={() => setVisible(false)}>
				<InterviewDetail data={interviewDetail} />
            </Dialog>

			<div style={{ marginBottom: "10px" }}>
				<PermissionButton
					name="insertInterview"
					icon="pi pi-plus"
					className="p-button-raised"
					label="Thêm mới"
					onClick={() => history.push(INTERVIEW_CREATE)}
				/>
			</div>

			{statusInterview === STATUS_REQUEST.LOADING &&
				"Đang tải dữ liệu..."}
			{statusInterview === STATUS_REQUEST.SUCCEEDED && (
				<div className="card">
					<CustomDataTable
						selectionMode="single"
						dataTable={interviews}
					>
						{columns}
					</CustomDataTable>
				</div>
			)}
		</>
	);
};

export default InterviewList;
