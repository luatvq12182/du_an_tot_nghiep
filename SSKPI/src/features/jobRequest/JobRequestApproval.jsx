import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getJobRequestById } from "redux/jobRequest/selector";
import formatTime from "utils/formatTime";
import { APPROVAL_STATUS } from "constants/app";

import { Fieldset } from "primereact/fieldset";
import { Tag } from "primereact/tag";
import PermissionButton from "components/PermissionButton";
import CustomBreadCrumb from "components/CustomBreadCrumb";
import { showConfirm } from "redux/confirmBox/actionCreator";
import { approvalJobRequest } from "redux/jobRequest/actionCreator";
import { useState } from "react";
import FormReject from "./FormReject";

const items = [
	{ label: "Yêu cầu tuyển dụng", url: "/admin/jobrequest" },
	{ label: "Xử lý yêu cầu" },
];

const JobRequestApproval = () => {
	const { id } = useParams();
	const jobDetail = useSelector(getJobRequestById(id));
	const dispatch = useDispatch();

	const [visible, setVisible] = useState(false);

	if (!jobDetail) {
		return "Yêu cầu này đã bị xóa hoặc không tồn tại!";
	}

	const genStatusTag = (status) => {
		switch (status) {
			case APPROVAL_STATUS.CHO_DUYET:
				return <Tag className="p-mr-2" value="Chờ duyệt" />;
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
			default:
				break;
		}
	};

	const rows = [
		{ title: "Dự án:", value: jobDetail?.title },
		{ title: "Trạng thái:", value: genStatusTag(jobDetail?.status) },
		{ title: "Người yêu cầu:", value: jobDetail?.petitioner?.name },
		{
			title: "Ngày tạo:",
			value: formatTime.formatShortDate(jobDetail.created_at),
		},
	];

	const handleClickApproval = () => {
		dispatch(
			showConfirm(
				"Bạn có muốn phê duyệt yêu cầu tuyển dụng này không?",
				() => {
					dispatch(approvalJobRequest(jobDetail?.id));
				}
			)
		);
	};

	return (
		<>
			<CustomBreadCrumb items={items} />

			<FormReject
				visible={visible}
				onHide={() => setVisible(false)}
				id={jobDetail?.id}
			/>

			<div className="card">
				<Fieldset legend="Thông tin yêu cầu" toggleable>
					<table className="jobDetail">
						<tbody>
							{rows.map((row) => (
								<tr>
									<th>{row.title}</th>
									<th>{row.value}</th>
								</tr>
							))}
						</tbody>
					</table>
				</Fieldset>

				<Fieldset className="mt-1" legend="Xử lý yêu cầu" toggleable>
					{jobDetail.status === APPROVAL_STATUS.CHO_DUYET ? (
						<>
							<PermissionButton
								name="appovalJobRequest"
								onClick={() => handleClickApproval()}
								className="p-button-success mr-1"
								label="Phê duyệt"
							/>
							<PermissionButton
								name="rejectJobRequest"
								onClick={() => setVisible(true)}
								className="p-button-danger"
								label="Từ chối"
							/>
						</>
					) : (
						"Yêu cầu đã được xử lý!"
					)}
				</Fieldset>
			</div>
		</>
	);
};

export default JobRequestApproval;
