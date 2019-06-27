import { CREATE_DRAFT, UPDATE_DRAFT_LOCATION, DELETE_DRAFT } from "./type";

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
