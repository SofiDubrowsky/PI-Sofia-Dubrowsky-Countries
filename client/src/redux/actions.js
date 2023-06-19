import { GET_ACTIVITIES, DELETE_ACTIVITIES, GET_COUNTRIES, GET_COUNTRY_DETAIL, CREATE_ACTIVITY,SEARCH_COUNTRY,FILTER_COUNTRY, ORDER_BY_NAME,} from "./action-types";

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001';

export const getCountries = () => {
    return async (dispatch) => {
        const {data} = await axios.get('/countries');
        return dispatch({ type: GET_COUNTRIES, payload: data });
    }
};

export const getCountryDetail = (id) => {
    return async (dispatch) => {
        let info = await axios.get(`/countries/${id}`);
        return dispatch({ type: GET_COUNTRY_DETAIL, payload: info.data });
    }
}

export const createActivity = (payload) => {
    return async (dispatch) => {
        let info = await axios.post('/activities',payload);
        return dispatch({ type: CREATE_ACTIVITY, payload: info.data });
    }
}

export const getActivities = (payload) => {
    return async (dispatch) => {
        let info = await axios.get('/activities', payload);
        return dispatch({ type: GET_ACTIVITIES, payload: info.data });
    }
}

export const deleteActivities = (payload) => {
    return async (dispatch) => {
        try {
            let info = await axios.delete(`/activities?name=${payload}`);
            return dispatch({ type: DELETE_ACTIVITIES, payload: info.data })
        } catch (error) {
            console.log('Error al borrar la actividad', error);
        }
    }
}

export const searchCountry = (payload) => {
    return async (dispatch) => {
        try {
            let info = await axios.get(`/countries?name=${payload}`);
            return dispatch({ type: SEARCH_COUNTRY, payload: info.data })
        } catch (error) {
            console.log('Error al buscar pais', error);
        }
    }
}

//----------------------Filtrados----------------------


export const countryFilter = (payload)=>{
    return { type: FILTER_COUNTRY, payload }
}

//----------------------Ordenados----------------------

export const ordeByName = (payload) => {
    return {
        type:ORDER_BY_NAME,
        payload
    }
}

// export const orderByPopulation = (payload) => {
//     return {
//         type: ORDER_BY_POPULATION,
//         payload
//     }
// }  Al final no lo use porque junte los dos ordenamientos
