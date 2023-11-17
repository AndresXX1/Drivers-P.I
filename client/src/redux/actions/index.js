import axios from "axios";

export const GET_DRIVERS = "GET_DRIVERS";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_DRIVER_DETAILS = "GET_DRIVER_DETAILS";
export const GET_DRIVER_TEAMS = "GET_DRIVER_TEAMS";
export const CREATE_DRIVER = "CREATE_DRIVER";


const BASE_URL = `http://localhost:3001/drivers`;

export function getDrivers() {
  return async function (dispatch) {
    try {
      const response = await axios("http://localhost:3001/drivers");
      dispatch({
        type: GET_DRIVERS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };
}

export function getByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/drivers/name?name=${name}`);
      dispatch({
        type: GET_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching drivers by name:", error);
    }
  };
}
export function getDriverDetails(id) {
    return async function (dispatch) {
      try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        dispatch({
          type: GET_DRIVER_DETAILS,
          payload: response.data,
        });
      } catch (error) {
        console.error("Error fetching driver details:", error);
      }
    };
  }

  export function getDriverTeams(driverId) {
    return async function (dispatch) {
      try {
        const response = await axios.get(`http://localhost:3001/drivers/team/`);
        dispatch({
          type: GET_DRIVER_TEAMS,
          payload: { driverId, teams: response.data },
        });
      } catch (error) {
        console.error("Error fetching driver teams:", error);
      }
    };
  }


export function createDriver(driverData) {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/create", driverData);
      dispatch({
        type: CREATE_DRIVER,
        payload: response.data, // Puedes manejar la respuesta del servidor como desees
      });
    } catch (error) {
      console.error("Error creating driver:", error);
    }
  };
}

