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
      .get(`http://localhost:3001/countriesSearch?name=${payload}`)
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
  let valido;
  let response = await axios
    .post("http://localhost:3001/activities", payload)
    .then((res) => {
      console.log(res);
      console.log("todo correcto");
      valido = true;
      return res;
    })
    .catch((err) => {
      //window.alert(err.message);
      valido = false;
      return err;
    });

  valido
    ? window.alert("Activity created!")
    : window.alert(response.response.data.message);

  /* return (dispatch) => {
    dispatch({ type: CREATE_ACTIVITY, payload: response });
  }; */
};
