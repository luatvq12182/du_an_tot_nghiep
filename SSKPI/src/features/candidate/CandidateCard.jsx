import { Button } from "primereact/button";
import { Card } from "primereact/card";

const CandidateCard = ({ image, name, email, phone, cv, status }) => {
	const header = (
		<>
			<div className="label_candidate">{status}</div>
			<img
				alt="Card"
				src={`http://34.124.182.156/storage/images/candidate/${image}`}
				onError={(e) =>
					(e.target.src =
						"https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
				}
			/>
		</>
	);

	const footer = () => {
		const el = document.createElement("a");
		el.href = cv;
		el.setAttribute("target", "_blank");

		return (
			<span>
				<Button label="Xem CV ứng viên" onClick={() => el.click()} />
			</span>
		);
	};

	return (
		<Card title={name} subTitle={phone} header={header} footer={footer()}>
			{email}
		</Card>
	);
};

export default CandidateCard;
