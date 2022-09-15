import {
  GET_COUNTRIES,
  GET_COUNTRY,
  SEARCH_COUNTRY,
  GET_ACTIVITIES,
  CREATE_ACTIVITY,
} from "./actions";

const initialState = {
  countries: [],
  activities: [],
  country: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return { ...state, countries: action.payload };

    case GET_COUNTRY:
      //console.log(action.payload, "REDUCER country");
      return { ...state, countries: action.payload };

    case SEARCH_COUNTRY:
      //console.log(action.payload, "REDUCER SEARCH");
      return { ...state, countries: action.payload };

    case GET_ACTIVITIES:
      return { ...state, activities: action.payload };

    case CREATE_ACTIVITY:
      return { ...state, activities: action.payload };

    default:
      return { ...state };
  }
}
