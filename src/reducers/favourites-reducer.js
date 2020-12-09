import {Types} from '../config/types';
import {getPersistMachineAction} from 'redux-persist-machine';

/** Constants */
const InitialFavoritesState = {
  favorites: [],
};

export const favoritesReducer = (state = InitialFavoritesState, action) => {
  switch (action.type) {
    case Types.ADD_COMPANY_TO_FAVORITES: {
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    }
    case Types.REMOVE_COMPANY_FROM_FAVORITES: {
      return {
        ...state,
        favorites: [
          ...state.favorites.filter((favorite) => favorite !== action.payload),
        ],
      };
    }
    case getPersistMachineAction('favorites'): {
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
