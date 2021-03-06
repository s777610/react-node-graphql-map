import {
  CREATE_DRAFT,
  UPDATE_DRAFT_LOCATION,
  DELETE_DRAFT,
  GET_PINS,
  CREATE_PIN,
  SET_PIN,
  DELETE_PIN,
  CREATE_COMMENT
} from "../actions/type";

const INITIAL_STATE = {
  draft: null,
  pins: [],
  currentPin: null
};

export default function mapReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_DRAFT:
      return {
        ...state,
        currentPin: null,
        draft: {
          latitude: 0,
          longitude: 0
        }
      };
    case UPDATE_DRAFT_LOCATION:
      return {
        ...state,
        draft: action.payload
      };
    case DELETE_DRAFT:
      return {
        ...state,
        draft: null
      };
    case GET_PINS:
      return {
        ...state,
        pins: action.payload
      };
    case CREATE_PIN:
      const newPin = action.payload;
      const prevPins = state.pins.filter(pin => pin._id !== newPin._id);
      return {
        ...state,
        pins: [...prevPins, newPin]
      };
    case SET_PIN:
      return {
        ...state,
        currentPin: action.payload,
        draft: null
      };
    case DELETE_PIN:
      const deletedPin = action.payload;
      const filteredPins = state.pins.filter(pin => pin._id !== deletedPin._id);
      if (state.currentPin) {
        const isCurrentPin = deletedPin._id === state.currentPin._id;
        if (isCurrentPin) {
          return {
            ...state,
            pins: filteredPins,
            currentPin: null
          };
        }
      }
      return {
        ...state,
        pins: filteredPins
      };
    case CREATE_COMMENT:
      const updatedCurrentPin = action.payload;
      // find and replace
      const updatedPins = state.pins.map(pin => {
        return pin._id === updatedCurrentPin._id ? updatedCurrentPin : pin;
      });
      return {
        ...state,
        pins: updatedPins,
        currentPin: updatedCurrentPin
      };
    default:
      return state;
  }
}
