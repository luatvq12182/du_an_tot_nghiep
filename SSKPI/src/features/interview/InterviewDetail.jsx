const InterviewDetail = ({ data }) => {
	console.log(data);

	return (
		<div className="relative">
			<table className="jobDetail">
				<tbody>
					<tr>
						<th>Dự án: </th>
						<td>{data?.job_name}</td>
					</tr>
					<tr>
						<th>Tiêu đề thư mời: </th>
						<td>{data?.title}</td>
					</tr>
					<tr>
						<th>Thời gian phỏng vấn: </th>
						<td>{data?.time_interview}</td>
					</tr>
					<tr>
						<th>Địa điểm phỏng vấn:</th>
						<td>{data?.location}</td>
					</tr>
					<tr>
						<th>Người phỏng vấn: </th>
						<td>{data?.receiver}</td>
					</tr>
					<tr>
						<th>Ứng viên: </th>
						<td>{data?.name_candidate?.name}</td>
					</tr>
                    <tr>
						<th>Vòng phỏng vấn: </th>
						<td>{data?.round_no}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default InterviewDetail;
