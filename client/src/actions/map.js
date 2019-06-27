import { CREATE_DRAFT, UPDATE_DRAFT_LOCATION } from "./type";

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
