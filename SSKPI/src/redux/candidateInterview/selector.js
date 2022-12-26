export const getCandidateInterviews = (state) => {
	let candidate = {};
	state?.cadidate?.cadidate.forEach((item) => {
		candidate[item.id] = item;
	});

	let jobRequest = {};
	if (Array.isArray(state?.jobRequest?.data)) {
		state?.jobRequest?.data.forEach((item) => {
			jobRequest[item.id] = item;
		});
	}

	let interview = {};
	state?.interview?.data.forEach((item) => {
		interview[item.id] = item;
	});

	return state.candidateInterview.candidateInterview.map((item) => ({
		...item,
		candidate_name: candidate?.[item.candidate_id]?.name,
		image: candidate?.[item.candidate_id]?.image,
		emailUV: candidate?.[item.candidate_id]?.email,
		job_name: jobRequest?.[candidate?.[item.candidate_id]?.job_id]?.title,
		viTriUngTuyen:
			jobRequest?.[candidate?.[item.candidate_id]?.job_id]?.position,
		round: interview?.[item.interview_id]?.round_no,
		location: interview?.[item.interview_id]?.location,
		idInterview: interview?.[item.interview_id]?.id,
	}));
};
