import CandidateCard from "./CandidateCard";

const CandidateColumnList = ({ candidates = [] }) => {
	return (
		<div className="p-grid">
			{candidates.map((candidate) => (
				<div key={candidate.id} className="p-lg-3 p-md-6">
					<CandidateCard {...candidate} />
				</div>
			))}
		</div>
	);
};

export default CandidateColumnList;
