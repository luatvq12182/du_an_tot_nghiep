import { lazy } from "react";
import {
    CANDIDATE,
    INTERVIEW,
    INTERVIEW_CREATE,
    CANDIDATE_CREATE,
    CANDIDATE_EDIT,
    //   INTERVIEW,
    //   INTERVIEW_CREATE,
    JOBREQUEST,
    JOBREQUEST_DETAIL,
    JOBREQUEST_CREATE,
    JOBREQUEST_EDIT,
    JOBREQUEST_APPROVAL,
    JOBREQUEST_REPORT,
    //   REPORT,
    CANDIDATE_INTERVIEW_LIST,
    CANDIDATE_INTERVIEW_SHOW,
    CANDIDATE_INTERVIEW_EDIT,
    FEATURE,
    INFO_USER,
    CHANGE_PASSWORD,
} from "constants/appPath";
import { USER } from "../constants/appPath";
import JobRequestReport from "features/jobRequest/JobRequestReport";

const CandidateList = lazy(() =>
    import ("features/candidate/CandidateList"));
const CandidateCreate = lazy(() =>
    import ("features/candidate/CandidateCreat"));
const CandidateEdit = lazy(() =>
    import ("features/candidate/CandidateEdit"));
const JobRequestList = lazy(() =>
    import ("features/jobRequest/JobRequestList"));
const JobRequestDetail = lazy(() =>
    import ("features/jobRequest/JobRequestDetail")
);
const JobRequestInsert = lazy(() =>
    import ("features/jobRequest/FormInsert"));
const JobRequestUpdate = lazy(() =>
    import ("features/jobRequest/FormUpdate"));
const JobRequestApproval = lazy(() =>
    import ("features/jobRequest/JobRequestApproval")
);

const InterviewList = lazy(() =>
    import ("features/interview/InterviewList"));
const CreateFormNPV = lazy(() =>
    import ("features/interview/CreateFormNPV"));

const CandidateInterviewList = lazy(() =>
    import ("features/review/CandidateInterviewList")
);
const CandidateInterviewShow = lazy(() =>
    import ("features/review/CandidateInterViewShow")
);
const EditCandidateInterview = lazy(() =>
    import ("features/review/EditCandidateInterview")
);

const UserManage = lazy(() =>
    import ("features/user/UserManage"));
const UserInfo = lazy(() =>
    import ("features/user/UserDetail"));
const ChangePassword = lazy(() =>
    import ("features/user/ChangePassword"));

const FeatureManage = lazy(() =>
    import ("features/feature/FeatureManage"));

const routes = [{
        path: JOBREQUEST,
        name: "jobrequestList",
        component: JobRequestList,
        exact: true,
    },
    {
        path: JOBREQUEST_DETAIL,
        name: "jobrequestDetail",
        component: JobRequestDetail,
        exact: true,
    },
    {
        path: JOBREQUEST_CREATE,
        name: "jobrequestInsert",
        component: JobRequestInsert,
        exact: true,
    },
    {
        path: JOBREQUEST_EDIT,
        name: "jobrequestUpdate",
        component: JobRequestUpdate,
        exact: true,
    },
    {
        path: JOBREQUEST_APPROVAL,
        name: "jobrequestApproval",
        component: JobRequestApproval,
        exact: true,
    },
    {
        path: JOBREQUEST_REPORT,
        name: "jobrequestReport",
        component: JobRequestReport,
    },
    {
        path: CANDIDATE,
        name: "candidate",
        component: CandidateList,
        exact: true,
    },
    {
        path: CANDIDATE_CREATE,
        name: "candidateCreate",
        component: CandidateCreate,
        exact: true,
    },
    {
        path: CANDIDATE_EDIT,
        name: "candidateEdit",
        component: CandidateEdit,
        exact: true,
    },
    {
        path: INTERVIEW,
        name: "interview",
        component: InterviewList,
        exact: true,
    },
    {
        path: INTERVIEW_CREATE,
        name: "interviewCreate",
        component: CreateFormNPV,
        exact: true,
    },
    {
        path: CANDIDATE_INTERVIEW_LIST,
        name: "candidateInterviewList",
        component: CandidateInterviewList,
        exact: true,
    },
    {
        path: CANDIDATE_INTERVIEW_SHOW,
        name: "candidateInterviewShow",
        component: CandidateInterviewShow,
        exact: true,
    },
    {
        path: CANDIDATE_INTERVIEW_EDIT,
        name: "candidateInterviewEdit",
        component: EditCandidateInterview,
        exact: true,
    },
    {
        path: USER,
        name: "user",
        component: UserManage,
        exact: true,
    },
    {
        path: FEATURE,
        name: "feature",
        component: FeatureManage,
        exact: true,
    },
    {
        path: INFO_USER,
        name: "infomation_user",
        component: UserInfo,
        exact: true,
    },
    {
        path: CHANGE_PASSWORD,
        name: "change_password",
        component: ChangePassword,
        exact: true,
    },
];

export default routes;