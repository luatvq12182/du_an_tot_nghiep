import { INTERVIEWER, MANAGER, HR_MANAGER, HR } from "./app";

const PERMISSION_BUTTON = {
    // JOB REQUEST
    insertJobRequest: [MANAGER],
    viewDetailJobRequest: [MANAGER, HR_MANAGER],
    updateJobRequest: [MANAGER],
    deleteJobRequest: [MANAGER, HR_MANAGER],
    appovalJobRequest: [HR_MANAGER],
    rejectJobRequest: [HR_MANAGER],

    // INTERVIEW CALENDAR
    insertInterview: [HR_MANAGER, HR],
    viewDetailInterview: [MANAGER, HR_MANAGER, HR, INTERVIEWER],
    acceptInterview: [MANAGER, INTERVIEWER],
    rejectInterview: [MANAGER, INTERVIEWER],

    //INTERVIEW CANDIDATE
    viewDetailEvaluate: [MANAGER, HR_MANAGER, HR, INTERVIEWER],
    evaluate: [INTERVIEWER, MANAGER],
    editEvaluate: [INTERVIEWER, MANAGER],

    //CADIDATE
    detailCandidate: [HR_MANAGER, HR],
    editCandidate: [HR_MANAGER, HR],
};

export default PERMISSION_BUTTON;