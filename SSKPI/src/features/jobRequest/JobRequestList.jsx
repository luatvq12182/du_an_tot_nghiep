import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import CustomBreadCrumb from "components/CustomBreadCrumb";
import CustomDataTable from "components/CustomDataTable";
import PermissionButton from "components/PermissionButton";

import { Button } from "primereact/button";
// import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";

import { deleteJobRequest } from "redux/jobRequest/actionCreator";
import { getJobRequest } from "redux/jobRequest/selector";
import { showConfirm } from "redux/confirmBox/actionCreator";
import { APPROVAL_STATUS } from "constants/app";
import formatTime from "utils/formatTime";
import { compareTimeFromTo } from "utils/compareTime";
import { genStyle, genColumns } from "utils/genColumns";

const JobRequestList = () => {
	const dispatch = useDispatch();
	const data = useSelector(getJobRequest);
	const history = useHistory();
	const [filter, setFilter] = useState(false);
	const [statusFilter, setStatusFilter] = useState([]);
	const [deadLine, setDeadLine] = useState([]);
	const items = [
		{ label: "Yêu cầu tuyển dụng", url: "/admin/jobrequest" },
		{ label: "Danh sách yêu cầu" },
	];

	const statuses = [
		{ id: 0, name: "Từ chối", code: "TU_CHOI", severity: "danger" },
		{ id: 2, name: "Đã duyệt", code: "DA_DUYET", severity: "success" },
		{ id: 1, name: "Chờ duyệt", code: "MOI_TAO", severity: "primary" },
	];

	const handleClickView = (data) => {
		history.push(`/admin/jobrequest/detail/${data.id}`);
	};

	const handleClickUpdate = (data) => {
		history.push(`/admin/jobrequest/edit/${data.id}`);
	};

	const handleClickDelete = (data) => {
		dispatch(
			showConfirm(
				"Bạn có chắc muốn xóa yêu cầu tuyển dụng này không?",
				() => {
					dispatch(deleteJobRequest(data.id));
				}
			)
		);
	};

	const handleClickApproval = (data) => {
		history.push("/admin/jobrequest/approval/" + data.id);
	};

	const handleExport = async (data) => {
		window.location.href = "http://34.124.182.156/api/pdf/" + data.id;
	};

	const genFormatTimeCol = (data) => {
		return formatTime.formatShortDate(data.deadline);
	};

	const genStatusCol = (data) => {
		switch (Number(data.status)) {
			case APPROVAL_STATUS.TU_CHOI:
				return (
					<Tag className="p-mr-2" severity="danger" value="Từ chối" />
				);

			case APPROVAL_STATUS.DA_DUYET:
				return (
					<Tag
						className="p-mr-2"
						severity="success"
						value=" Đã duyệt"
					/>
				);

			case APPROVAL_STATUS.CHO_DUYET:
				return <Tag className="p-mr-2" value="Chờ duyệt" />;

			default:
				break;
		}
	};

	const genActionCol = (data) => {
		return (
			<>
				<PermissionButton
					name="viewDetailJobRequest"
					tooltip="Xem chi tiết"
					onClick={() => handleClickView(data)}
					className="p-button-rounded p-button-text p-button-info"
					icon="pi pi-eye"
				/>
				<PermissionButton
					name="updateJobRequest"
					tooltip="Cập nhật"
					onClick={() => handleClickUpdate(data)}
					disabled={data.status === APPROVAL_STATUS.DA_DUYET}
					className="p-button-rounded p-button-text p-button-help"
					icon="pi pi-pencil"
				/>
				<PermissionButton
					name="deleteJobRequest"
					tooltip="Xóa"
					onClick={() => handleClickDelete(data)}
					className="p-button-rounded p-button-text p-button-danger"
					icon="pi pi-trash"
					disabled={
						data.status === APPROVAL_STATUS.DA_DUYET ||
						data.status === APPROVAL_STATUS.TU_CHOI
					}
				/>
				<PermissionButton
					name="appovalJobRequest"
					tooltip="Xử lý yêu cầu"
					onClick={() => handleClickApproval(data)}
					className="p-button-rounded p-button-text p-button-danger"
					icon="pi pi-check-circle"
					disabled={data.status !== APPROVAL_STATUS.CHO_DUYET}
				/>
				<PermissionButton
					name="viewDetailJobRequest"
					tooltip="Xuất file PDF"
					onClick={() => handleExport(data)}
					className="p-button-rounded p-button-text p-button-danger"
					icon="pi pi-file-pdf"
					disabled={data.status !== APPROVAL_STATUS.DA_DUYET}
				/>
			</>
		);
	};

	const statusTemplate = (option) => (
		<Tag
			className="p-mr-2"
			severity={option.severity}
			value={option.name}
		/>
	);

	const selectedStatusTemplate = (option) => {
		if (option) {
			return (
				<Tag
					className="p-mr-2"
					severity={option.severity}
					value={option.name}
				/>
			);
		}

		return "Trạng thái";
	};

	const dataFilter = useMemo(() => {
		const statusSelected = statusFilter.map((item) => item.id);

		if (statusSelected.length === 0 && deadLine.length === 0) {
			return data;
		}

		return (
			Array.isArray(data) &&
			data.filter((item) => {
				return (
					(statusSelected.length === 0 ||
						statusSelected.indexOf(item.status) !== -1) &&
					(deadLine.length === 0 ||
						compareTimeFromTo(
							item.deadline,
							deadLine[0],
							deadLine[1]
						))
				);
			})
		);
	}, [deadLine, statusFilter, data]);

	const cols = [
		{
			field: "title",
			header: "Tên dự án",
			style: genStyle("250px", false),
		},
		{
			field: "deadline",
			body: genFormatTimeCol,
			header: "Hạn tuyển",
			style: genStyle("120px"),
		},
		{
			field: "position",
			header: "Vị trí tuyển dụng",
			style: genStyle("200px", false),
		},
		{ field: "amount", header: "Số lượng tuyển", style: genStyle("120px") },
		{
			field: "petitioner_name",
			header: "Người yêu cầu",
			style: genStyle("150px"),
		},
		{
			field: "status",
			body: genStatusCol,
			header: "Trạng thái",
			style: genStyle("100px"),
		},
		{
			field: "action",
			body: genActionCol,
			header: <i className="pi pi-cog" />,
			style: genStyle("200px"),
		},
	];

	const columns = genColumns(cols);

	return (
		<>
			<CustomBreadCrumb items={items} />

			<div className="filter">
				<PermissionButton
					name="insertJobRequest"
					icon="pi pi-plus"
					className="p-button-raised"
					label="Thêm mới"
					onClick={() => history.push("/admin/jobrequest/create")}
				/>
				<Button
					icon="pi pi-filter"
					className="p-button-raised p-button-help"
					label="Bộ lọc"
					onClick={() => setFilter(!filter)}
				/>

				<div className={`card filter_element ${!filter && "hide"}`}>
					<Calendar
						id="range"
						className="mr-1"
						value={deadLine}
						showButtonBar
						dateFormat="dd/mm/yy"
						onChange={(e) => setDeadLine(e.value)}
						onClearButtonClick={() => setDeadLine([])}
						selectionMode="range"
						placeholder="Hạn tuyển"
						readOnlyInput
					/>
					<MultiSelect
						value={statusFilter}
						itemTemplate={statusTemplate}
						selectedItemTemplate={selectedStatusTemplate}
						options={statuses}
						onChange={(e) => setStatusFilter(e.value)}
						optionLabel="name"
						placeholder="Trạng thái"
						display="chip"
					/>
				</div>
			</div>

			{data === "error" &&
				"Đã xảy ra lỗi, vui lòng liên hệ với quản trị viên!"}
			{Array.isArray(data) && (
				<div className="card">
					<CustomDataTable
						selectionMode="single"
						dataTable={dataFilter}
						showSearch={true}
					>
						{columns}
					</CustomDataTable>
				</div>
			)}
		</>
	);
};

export default JobRequestList;
