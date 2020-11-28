import { Types } from "../config/types";

/** Constants */
const InitialTextsState = {
    texts: [],
};

export const textsReducer = (state = InitialTextsState, action) => {
    switch (action.type) {
      case Types.ADD_TEXT_BUBBLE: {
        return {...state, texts: [...state.texts, action.payload]};
      }
      case Types.UPDATE_TEXT_BUBBLE: {
        return {
          ...state,
          texts: state.texts.map((text) => {
            if (text.id === action.payload.id) {
              return action.payload;
            } else {
              return text;
            }
          }),
        };
      }
      case Types.REMOVE_TEXT_BUBBLE: {
        return {
          ...state,
          texts: [
            ...state.texts.filter((text) => !(text.id === action.payload.id)),
          ],
        };
      }
      case Types.LOAD_TEXTS: {
        return {
          ...state,
          ...action.payload,
        };
      }
      default: {
        return state;
      }
    }
  };
  