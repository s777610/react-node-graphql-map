import {
  CREATE_DRAFT,
  UPDATE_DRAFT_LOCATION,
  DELETE_DRAFT
} from "../actions/type";

const INITIAL_STATE = {
  draft: null
};

export default function mapReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_DRAFT:
      return {
        ...state,
        draft: {
          latitude: 0,
          longitude: 0
        }
      };
    case UPDATE_DRAFT_LOCATION:
      console.log("mapReducer", action.payload);
      return {
        ...state,
        draft: action.payload
      };
    case DELETE_DRAFT:
      return {
        ...state,
        draft: null
      };
    default:
      return state;
  }
}
