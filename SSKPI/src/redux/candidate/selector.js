import formatTime from "utils/formatTime";

export const getCandidates = (state) => state.cadidate.cadidate;

export const getCandidatesByJobRequestId = (id) => state => {
    const data = state.cadidate.cadidate.filter(item => item.job_id === Number(id));

    return data.map(item => ({
        ...item,
        created_at: formatTime.formatShortDate(item.created_at)
    }))
}
