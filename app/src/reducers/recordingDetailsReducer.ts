import {
	LOAD_RECORDING_DETAILS_FAILURE,
	LOAD_RECORDING_DETAILS_IN_PROGRESS,
	LOAD_RECORDING_DETAILS_SUCCESS,
} from "../actions/recordingDetailsActions";

/**
 * This file contains redux reducer for actions affecting the state of a recording/capture agent
 */

// Initial state of recording details in redux store
const initialState = {
	isLoading: false,
	name: "",
	status: "",
	update: "",
	url: "",
	capabilities: [],
	configuration: [],
	inputs: [],
};

// Reducer for recording details
// @ts-expect-error TS(7006): Parameter 'action' implicitly has an 'any' type.
const recordingDetails = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case LOAD_RECORDING_DETAILS_IN_PROGRESS: {
			return {
				...state,
				isLoading: true,
			};
		}
		case LOAD_RECORDING_DETAILS_SUCCESS: {
			const { recordingDetails } = payload;
			return {
				...state,
				isLoading: false,
				name: recordingDetails.Name,
				status: recordingDetails.Status,
				update: recordingDetails.Update,
				url: recordingDetails.URL,
				capabilities: recordingDetails.capabilities,
				configuration: recordingDetails.configuration,
				inputs: recordingDetails.inputs,
			};
		}
		case LOAD_RECORDING_DETAILS_FAILURE: {
			return {
				...state,
				isLoading: false,
			};
		}
		default:
			return state;
	}
};

export default recordingDetails;
