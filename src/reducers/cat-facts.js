import { ReduxNL } from "redux-nl";

/** Constants */
const FetchCatFacts = ReduxNL.response.type.get("/facts");
const InitialCatFactsState = {
  data: [],
};

export const catFacts = (state = InitialCatFactsState, action) => {
    switch (action.type) {
      case FetchCatFacts: {
        return {
          ...state,
          data: action.payload.data.data.all,
        };
      }
      default: {
        return state;
      }
    }
  };