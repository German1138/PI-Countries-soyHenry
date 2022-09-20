import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY = "GET_COUNTRY";
export const SEARCH_COUNTRY = "SEARCH_COUNTRY";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";

export const getCountries = (state = { sort: "", filter: "" }) => {
  return async (dispatch) => {
    axios
      .get(`http://localhost:3001/countries?state=${state.filter}`)
      .then((response) => response.data)
      .then((response) =>
        dispatch({ type: GET_COUNTRIES, payload: { response, state } })
      );
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
      .then((response) => dispatch({ type: SEARCH_COUNTRY, payload: response }))
      .catch((err) => dispatch({ type: SEARCH_COUNTRY, payload: [] }));
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
  axios
    .post("http://localhost:3001/activities", payload)
    .then((response) => {
      //console.log(response);
      return response;
    })
    .catch((err) => {
      //console.log(err);
      return err;
    });
  return (dispatch) => {
    dispatch({ type: CREATE_ACTIVITY, payload: payload });
  };
};
