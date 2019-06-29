import {
  CREATE_DRAFT,
  UPDATE_DRAFT_LOCATION,
  DELETE_DRAFT,
  GET_PINS,
  CREATE_PIN,
  SET_PIN,
  DELETE_PIN
} from "./type";

export const createDraft = () => {
  return {
    type: CREATE_DRAFT
  };
};

export const updateDraftLocation = ({ longitude, latitude }) => {
  return {
    type: UPDATE_DRAFT_LOCATION,
    payload: { longitude, latitude }
  };
};

export const deleteDraft = () => {
  return {
    type: DELETE_DRAFT
  };
};

export const getPinsCreator = pins => {
  return {
    type: GET_PINS,
    payload: pins
  };
};

export const createPinCreator = createPin => {
  return {
    type: CREATE_PIN,
    payload: createPin
  };
};

export const setPin = pin => {
  return { type: SET_PIN, payload: pin };
};

export const deletePinCreator = deletePin => {
  return {
    type: DELETE_PIN,
    payload: deletePin
  };
};
