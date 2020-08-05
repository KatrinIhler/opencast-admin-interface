import {LOAD_EVENTS_FAILURE, LOAD_EVENTS_IN_PROGRESS, LOAD_EVENTS_SUCCESS, SHOW_ACTIONS} from '../actions/eventActions';
import {eventsTableConfig} from "../configs/tableConfigs/eventsTableConfig";

/**
 * This file contains redux reducer for actions affecting the state of events
 */

// Fill columns initially with columns defined in eventsTableConfig
const initialColumns = eventsTableConfig.columns.map(column =>
    ({
        name: column.name,
        deactivated: false
    }));

// Initial state of events in redux store
const initialState = {
    isLoading: false,
    total: 0,
    count: 0,
    limit: 0,
    offset: 0,
    results: [],
    columns: initialColumns,
    showActions: false
}

// Reducer for events
const events = (state=initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOAD_EVENTS_IN_PROGRESS: {
            return {
                ...state,
                isLoading: true
            }
        }
        case LOAD_EVENTS_SUCCESS: {
            const { events } = payload;
            return {
                ...state,
                isLoading: false,
                total: events.total,
                count: events.count,
                limit: events.limit,
                offset: events.offset,
                results: events.results
            }
        }
        case LOAD_EVENTS_FAILURE: {
            return {
                ...state,
                isLoading: false
            }
        }
        case SHOW_ACTIONS: {
            const { isShowing } = payload;
            return {
                ...state,
                showActions: isShowing
            }
        }
        default:
            return state;
    }
};

export default events;
