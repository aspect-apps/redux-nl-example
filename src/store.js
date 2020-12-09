import {applyMiddleware, combineReducers, createStore} from 'redux';
import {
  createPersistMachine,
  getPersistMachineAction,
} from 'redux-persist-machine';
import {saveState, loadState} from 'react-native-redux-persist-tree';
import {ReduxNL, ActionReducer} from 'redux-nl';
import {favoritesReducer} from './reducers/favourites-reducer';
import {textsReducer} from './reducers/text-reducer';
import createSagaMiddleware from 'redux-saga';
import {all, spawn, take, takeLatest} from 'redux-saga/effects';
import {composeWithDevTools} from 'redux-devtools-extension';
import {catFacts} from './reducers/cat-facts';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  texts: textsReducer,
  catFacts: catFacts,
  action: ActionReducer,
});

const composeEnhancers = composeWithDevTools({
  maxAge: 200,
});

/**
 * The persistMiddleware function
 * will take a load and save function
 * from the specific storage that is being used.
 */

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

const persistMiddleware = createPersistMachine(
  persistThisData,
  saveState,
  loadState,
);

const sagaMiddleware = createSagaMiddleware();

const middleware = composeEnhancers(
  applyMiddleware(...[persistMiddleware, sagaMiddleware]),
);

/** STORE */
const store = createStore(rootReducer, middleware);

ReduxNL.setup(store, sagaMiddleware, {
  defaultUrl: 'https://brianiswu-cat-facts-v1.p.rapidapi.com/',
  isDev: true,
});

sagaMiddleware.run(sagas);
persistMiddleware.run(store);

function* sagas() {
  yield takeLatest('*', (action) => console.log('Working !!!'));
}

export {store};
