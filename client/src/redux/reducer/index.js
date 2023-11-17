import { GET_DRIVERS, GET_BY_NAME, GET_DRIVER_DETAILS, GET_DRIVER_TEAMS,CREATE_DRIVER } from "../actions/index";

let initialState = { allDrivers: [], teams: [], driverDetails: null };

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload,
      };

    case GET_BY_NAME:
      return {
        ...state,
        allDrivers: action.payload,
      };

    case GET_DRIVER_DETAILS:
      return {
        ...state,
        driverDetails: action.payload,
      };

    case GET_DRIVER_TEAMS:
      // Almacena los equipos asociados al conductor en el estado
      return {
        ...state,
        teams: {
          ...state.teams,
          [action.payload.id]: action.payload.teams,
        },
      };

      case CREATE_DRIVER:
        // Maneja la respuesta del servidor aquí si es necesario
        // Por ejemplo, puedes actualizar el estado con el nuevo corredor creado
        return {
          ...state,
          allDrivers: [...state.allDrivers, action.payload], // Agrega el nuevo corredor a la lista de corredores
        };

    default:
      return state;
  }
}

export default rootReducer;