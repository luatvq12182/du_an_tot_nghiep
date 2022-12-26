import CustomBreadCrumb from "components/CustomBreadCrumb";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getJobRequestById } from "redux/jobRequest/selector";
import { getCandidatesByJobRequestId } from "redux/candidate/selector";
import { Chart } from "primereact/chart";

const JobRequestReport = () => {
	const { id } = useParams();
	const jobDetail = useSelector(getJobRequestById(id));
	const candidates = useSelector(getCandidatesByJobRequestId(id));

	console.log(candidates);

	const items = [
		{ label: "Yêu cầu tuyển dụng", url: "/admin/jobrequest" },
		{ label: "Báo cáo tuyển dụng" },
	];

	const percent = (candidates.length / jobDetail?.amount) * 100;

	const basicData = {
		labels: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
		],
		datasets: [
			{
				label: "My First dataset",
				backgroundColor: "#42A5F5",
				data: [65, 59, 80, 81, 56, 55, 40],
			},
			{
				label: "My Second dataset",
				backgroundColor: "#FFA726",
				data: [28, 48, 40, 19, 86, 27, 90],
			},
		],
	};

	let basicOptions = {
		maintainAspectRatio: false,
		aspectRatio: 0.8,
		plugins: {
			legend: {
				labels: {
					color: "#495057",
				},
			},
		},
		scales: {
			x: {
				ticks: {
					color: "#495057",
				},
				grid: {
					color: "#ebedef",
				},
			},
			y: {
				ticks: {
					color: "#495057",
				},
				grid: {
					color: "#ebedef",
				},
			},
		},
	};

	let horizontalOptions = {
		indexAxis: "y",
		maintainAspectRatio: false,
		aspectRatio: 0.8,
		plugins: {
			legend: {
				labels: {
					color: "#495057",
				},
			},
		},
		scales: {
			x: {
				ticks: {
					color: "#495057",
				},
				grid: {
					color: "#ebedef",
				},
			},
			y: {
				ticks: {
					color: "#495057",
				},
				grid: {
					color: "#ebedef",
				},
			},
		},
	};

	const chartData = {
		labels: [
			"Vnws",
			"Top CV",
			"Tìm việc nhanh",
			"IT việc",
			"University campaign",
			"Network",
		],
		datasets: [
			{
				data: [3, 2, 1, 5, 6, 1],
				backgroundColor: [
					"#42A5F5",
					"#66BB6A",
					"#FFA726",
					"#26C6DA",
					"#7E57C2",
					"red",
				],
				hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
			},
		],
	};

	const lightOptions = {
		plugins: {
			legend: {
				labels: {
					color: "#fff",
				},
			},
		},
	};

	return (
		<>
			<CustomBreadCrumb items={items} />

			<div className="card">
				<div className="p-grid">
					<div className="p-col-6">
						<Chart
							type="pie"
							data={chartData}
							options={lightOptions}
							style={{ position: "relative", width: "60%" }}
						/>
					</div>
					<div className="p-col-6">
						<Chart
							type="bar"
							data={basicData}
							options={horizontalOptions}
						/>
					</div>
				</div>

				<Chart type="bar" data={basicData} options={basicOptions} />
			</div>
		</>
	);
};

export default JobRequestReport;
