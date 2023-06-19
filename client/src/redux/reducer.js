import { GET_ACTIVITIES, DELETE_ACTIVITIES, GET_COUNTRIES, GET_COUNTRY_DETAIL, CREATE_ACTIVITY,SEARCH_COUNTRY, ORDER_BY_NAME, FILTER_COUNTRY } from "./action-types";

const initialState = {
    countries: [],
    allCountries: [],
    countryDetail: {},
    activities: [],
}

const reducer = (state = initialState, {type,payload}) => {
    switch(type){

        case GET_COUNTRIES:
            return { ...state, countries: payload, allCountries: payload };

        case GET_COUNTRY_DETAIL:
            return { ...state, countryDetail: payload };

        case CREATE_ACTIVITY:
            return { ...state}
        
        case GET_ACTIVITIES:
            return { ...state, activities: payload };
            
        case DELETE_ACTIVITIES:
            return { ...state};

        case SEARCH_COUNTRY:
            let PaisesBuscados = payload
            let paisesfilt = state.countries
            if(state.countries!==state.allCountries){
                 PaisesBuscados = paisesfilt.filter((country) => payload.some((count) => count.id === country.id))
            }
            return {...state, countries:PaisesBuscados,};       

        // -------------------------------------FILTRADOS-----------------------------------

        case FILTER_COUNTRY:
            let countriesFiltrados = [...state.allCountries]


            if(payload.continent !== "All"){
                countriesFiltrados = countriesFiltrados.filter(el => el.continent === payload.continent)
            }
 

            if(payload.activity !== "All"){
                countriesFiltrados = countriesFiltrados.filter(country => country.Activities.find(activity => activity.name === payload.activity))
            }

            return {
                ...state,
                countries: countriesFiltrados,
            }

        // -------------------------------------ORDENAMIENTOS----------------------------------------

        case ORDER_BY_NAME:
            const allcountriescopy = [...state.countries]

            if(payload === "ascName")  return {...state,countries: allcountriescopy.sort((a, b) => a.name.localeCompare(b.name))}
            if(payload === "descName")  return {...state,countries: allcountriescopy.sort((a, b) => b.name.localeCompare(a.name))}
            if(payload === "ascPopulation")  return {...state,countries: allcountriescopy.sort((a, b) => parseInt(a.population, 10) - parseInt(b.population, 10))}
            if(payload === "descPopulation")  return {...state,countries: allcountriescopy.sort((a, b) => parseInt(b.population, 10) - parseInt(a.population, 10))}
            break;

        default:
            return {...state};
    }
};

export default reducer;