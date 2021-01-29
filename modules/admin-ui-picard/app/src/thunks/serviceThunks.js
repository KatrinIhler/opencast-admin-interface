import {loadServicesFailure, loadServicesSuccess} from "../actions/serviceActions";
import {loadSeriesInProgress} from "../actions/seriesActions";
import {getURLParams} from "../utils/resourceUtils";
import axios from "axios";

// fetch services from server
export const fetchServices = () => async (dispatch, getState) => {
    try {
        dispatch(loadSeriesInProgress());

        const state = getState();
        let params = getURLParams(state);

        // /services.json?limit=0&offset=0&filter={filter}&sort={sort}
        let data = await axios.get('admin-ng/services/services.json', { params: params });

        const services = await data.data;
        dispatch(loadServicesSuccess(services));

    } catch (e) {
        dispatch(loadServicesFailure())
    }
}
