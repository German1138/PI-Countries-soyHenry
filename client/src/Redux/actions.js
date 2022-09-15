import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY = "GET_COUNTRY";
export const SEARCH_COUNTRY = "SEARCH_COUNTRY";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";

export const getCountries = () => {
  return async (dispatch) => {
    axios
      .get("http://localhost:3001/countries")
      .then((response) => response.data)
      .then((response) => dispatch({ type: GET_COUNTRIES, payload: response }));
  };
};

export const getCountry = (payload) => {
  return async (dispatch) => {
    axios
      .get(`http://localhost:3001/countries/${payload}`)
      .then((response) => response.data)
      .then((response) => dispatch({ type: GET_COUNTRY, payload: response }));
  };
};

export const searchCountry = (payload) => {
  return async (dispatch) => {
    axios
      .get(`http://localhost:3001/countries?name=${payload}`)
      .then((response) => response.data)
      .then((response) =>
        dispatch({ type: SEARCH_COUNTRY, payload: response })
      );
  };
};

export const getActivities = () => {
  return async (dispatch) => {
    axios
      .get("http://localhost:3001/activities")
      .then((response) => response.data)
      .then((response) =>
        dispatch({ type: GET_ACTIVITIES, payload: response })
      );
  };
};

export const createActivity = async (payload) => {
  await axios.post("http://localhost:3001/activities", payload);
  return { type: CREATE_ACTIVITY, payload: payload };
};
