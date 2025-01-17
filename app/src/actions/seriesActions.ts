/**
 * This file contains all redux actions that can be executed on series
 */

// Constants of actions types for fetching series from server
export const LOAD_SERIES_IN_PROGRESS = "LOAD_SERIES_IN_PROGRESS";
export const LOAD_SERIES_SUCCESS = "LOAD_SERIES_SUCCESS";
export const LOAD_SERIES_FAILURE = "LOAD_SERIES_FAILURE";

// Constant of actions types affecting UI
export const SHOW_ACTIONS_SERIES = "SHOW_ACTIONS_SERIES";
export const SET_SERIES_COLUMNS = "SET_SERIES_COLUMNS";
export const SET_SERIES_SELECTED = "SET_SERIES_SELECTED";
export const SET_SERIES_DELETION_ALLOWED = "SET_SERIES_DELETION_ALLOWED";

// Constants of action types affecting fetching of series metadata from server
export const LOAD_SERIES_METADATA_IN_PROGRESS =
	"LOAD_SERIES_METADATA_IN_PROGRESS";
export const LOAD_SERIES_METADATA_SUCCESS = "LOAD_SERIES_METADATA_SUCCESS";
export const LOAD_SERIES_METADATA_FAILURE = "LOAD_SERIES_METADATA_FAILURE";

// Constants of action types affecting fetching of series themes from server
export const LOAD_SERIES_THEMES_IN_PROGRESS = "LOAD_SERIES_THEMES_IN_PROGRESS";
export const LOAD_SERIES_THEMES_SUCCESS = "LOAD_SERIES_THEMES_SUCCESS";
export const LOAD_SERIES_THEMES_FAILURE = "LOAD_SERIES_THEMES_FAILURE";

// Actions affecting fetching series from server

export const loadSeriesInProgress = () => ({
	type: LOAD_SERIES_IN_PROGRESS,
});

// @ts-expect-error TS(7006): Parameter 'series' implicitly has an 'any' type.
export const loadSeriesSuccess = (series) => ({
	type: LOAD_SERIES_SUCCESS,
	payload: { series },
});

export const loadSeriesFailure = () => ({
	type: LOAD_SERIES_FAILURE,
});

// Actions affecting UI

// @ts-expect-error TS(7006): Parameter 'isShowing' implicitly has an 'any' type... Remove this comment to see the full error message
export const showActions = (isShowing) => ({
	type: SHOW_ACTIONS_SERIES,
	payload: { isShowing },
});

// @ts-expect-error TS(7006): Parameter 'updatedColumns' implicitly has an 'any'... Remove this comment to see the full error message
export const setSeriesColumns = (updatedColumns) => ({
	type: SET_SERIES_COLUMNS,
	payload: { updatedColumns },
});

// @ts-expect-error TS(7006): Parameter 'id' implicitly has an 'any' type.
export const setSeriesSelected = (id) => ({
	type: SET_SERIES_SELECTED,
	payload: { id },
});

// @ts-expect-error TS(7006): Parameter 'deletionAllowed' implicitly has an 'any... Remove this comment to see the full error message
export const setSeriesDeletionAllowed = (deletionAllowed, hasEvents) => ({
	type: SET_SERIES_DELETION_ALLOWED,
	payload: { deletionAllowed, hasEvents },
});

// Actions affecting fetching of series metadata from server

export const loadSeriesMetadataInProgress = () => ({
	type: LOAD_SERIES_IN_PROGRESS,
});

// @ts-expect-error TS(7006): Parameter 'metadata' implicitly has an 'any' type.
export const loadSeriesMetadataSuccess = (metadata, extendedMetadata) => ({
	type: LOAD_SERIES_METADATA_SUCCESS,
	payload: { metadata, extendedMetadata },
});

export const loadSeriesMetadataFailure = () => ({
	type: LOAD_SERIES_METADATA_FAILURE,
});

// Actions affecting fetching of series themes from server

export const loadSeriesThemesInProgress = () => ({
	type: LOAD_SERIES_THEMES_IN_PROGRESS,
});

// @ts-expect-error TS(7006): Parameter 'themes' implicitly has an 'any' type.
export const loadSeriesThemesSuccess = (themes) => ({
	type: LOAD_SERIES_THEMES_SUCCESS,
	payload: { themes },
});

export const loadSeriesThemesFailure = () => ({
	type: LOAD_SERIES_THEMES_FAILURE,
});
