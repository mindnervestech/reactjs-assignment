//redux
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
// Redux Persist
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import reducer from '../reducers/globalReducer'
const AppRootReducer = combineReducers({
  appReducer: reducer,
});

const rootReducer = (state, action) => {
  return AppRootReducer(state, action);
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);
