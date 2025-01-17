import axios from "axios";
import {
	loadJobsFailure,
	loadJobsInProgress,
	loadJobsSuccess,
} from "../actions/jobActions";
import { getURLParams } from "../utils/resourceUtils";

// fetch jobs from server
// @ts-expect-error TS(7006): Parameter 'dispatch' implicitly has an 'any' type.
export const fetchJobs = () => async (dispatch, getState) => {
	try {
		dispatch(loadJobsInProgress());

		const state = getState();
		let params = getURLParams(state);

		// /jobs.json?limit=0&offset=0&filter={filter}&sort={sort}
		let data = await axios.get("/admin-ng/job/jobs.json?", { params: params });

		const jobs = await data.data;
		dispatch(loadJobsSuccess(jobs));
	} catch (e) {
		console.error(e);
		dispatch(loadJobsFailure());
	}
};
