/** IMPORTS */
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistMiddleware, createPersistMachine} from 'redux-persist-machine';
import {saveState, loadState} from 'react-native-redux-persist-tree';

/** CONSTANTS */
const InitialFavoritesState = {
  favorites: [],
};

const InitialTextsState = {
  texts: [],
};

/** TYPES */
const ADD_COMPANY_TO_FAVORITES = 'ADD_COMPANY_TO_FAVORITES';
const REMOVE_COMPANY_FROM_FAVORITES = 'REMOVE_COMPANY_FROM_FAVORITES';

const UPDATE_TEXT_BUBBLE = 'UPDATE_TEXT_BUBBLE';
const ADD_TEXT_BUBBLE = 'ADD_TEXT_BUBBLE';
const REMOVE_TEXT_BUBBLE = 'REMOVE_TEXT_BUBBLE';
const LOAD_TEXTS = 'LOAD_TEXTS';

/** REDUCERS */
const favoritesReducer = (state = InitialFavoritesState, action) => {
  switch (action.type) {
    case ADD_COMPANY_TO_FAVORITES: {
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    }
    case REMOVE_COMPANY_FROM_FAVORITES: {
      return {
        ...state,
        favorites: [
          ...state.favorites.filter((favorite) => favorite !== action.payload),
        ],
      };
    }
    case 'LOAD_FAVORITES': {
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

const textsReducer = (state = InitialTextsState, action) => {
  switch (action.type) {
    case ADD_TEXT_BUBBLE: {
      return {...state, texts: [...state.texts, action.payload]};
    }
    case UPDATE_TEXT_BUBBLE: {
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
    case REMOVE_TEXT_BUBBLE: {
      return {
        ...state,
        texts: [
          ...state.texts.filter((text) => !(text.id === action.payload.id)),
        ],
      };
    }
    case LOAD_TEXTS: {
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

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  texts: textsReducer,
});

/** MIDDLEWARE */

/**
 * The persistMiddleware function
 * will take a load and save function
 * from the specific storage that is being used.
 */
const middleware = [() => persistMiddleware(saveState, loadState)];

/** STORE */
const store = createStore(rootReducer, applyMiddleware(...middleware));

/**
 * Each property contains specifications
 * on what should persist for each reducer.
 *
 * The property's key is the reducer,
 * the `values` are the values you want to watch,
 * and the `key` is the identifier for the storage provider.
 *
 * There's an optional `action` property
 * which will load upon a specific action.
 */
const persistThisData = {
  favorites: {
    key: '@favorites',
  },
  texts: {
    key: '@texts',
  },
};

createPersistMachine(persistThisData, store, true);

export {
  store as default,
  ADD_COMPANY_TO_FAVORITES,
  REMOVE_COMPANY_FROM_FAVORITES,
  REMOVE_TEXT_BUBBLE,
  UPDATE_TEXT_BUBBLE,
  ADD_TEXT_BUBBLE,
};
