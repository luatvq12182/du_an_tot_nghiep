import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { getCandidateInterviews } from "redux/candidateInterview/selector";

const CandidateDetail = ({ data }) => {
	const candidateInterview = useSelector(getCandidateInterviews);
	const array = candidateInterview.filter(
		(item) => item.candidate_id === data.candidate_id
	);

	return (
		<div className="container">
			<h2 style={{ textAlign: "center" }}>Đánh giá ứng viên</h2>
			<p style={{ textAlign: "center" }}>Vòng {data?.round}</p>

			<div className="flex">
				<div className="col-2 mx-5">
					<img
						src={`http://34.124.182.156/storage/images/candidate/${data?.image}`}
						alt=""
						width="250px"
					/>
					<p>Họ tên : {data?.candidate_name}</p>
					<p>Email : {data?.emailUV}</p>
				</div>
				<div className="col-10">
					{array?.map((item) => {
						return (
							<>
								<p>Người phỏng vấn : {item.email}</p>
								<div className="flex">
									<div
										className="mr-5 card"
										style={{ marginBottom: "60px" }}
									>
										<h5>I, Tư duy</h5>
										<p>Hệ thống,logic : {item?.thinking}</p>
										<h5>II, Phẩm chất</h5>
										<p>
											Kiên trì bền bỉ :{" "}
											{item?.persistent_perseverance}
										</p>
										<p>
											Đam mê mục tiêu rõ ràng :{" "}
											{item?.career_goals}
										</p>
										<h5>V,Tổng kết</h5>
										<p>Kết quả : {item?.result}</p>
									</div>
									<div className="card">
										<h5>III, Chuyên môn</h5>
										<p>
											Chuyên môn :{" "}
											{item?.specialize_skill}
										</p>
										<h5>IV, Khác</h5>
										<p>Tiếng anh : {item?.english}</p>
										<p>
											Khả năng thích ứng :
											{item?.adaptability}
										</p>
										<p>
											Thời gian có thể onboard:{" "}
											{moment(item?.time_onbroad).format(
												" DD/MM/YYYY"
											)}
										</p>
										<p>Nhận xét</p>
										<span
											dangerouslySetInnerHTML={{
												__html: item?.reviews,
											}}
										></span>
									</div>
								</div>
							</>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default CandidateDetail;
