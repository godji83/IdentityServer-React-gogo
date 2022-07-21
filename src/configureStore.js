/* eslint-disable @typescript-eslint/camelcase */
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import createOidcMiddleware from "redux-oidc";
import userManager from "./userManager";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./store/Index";

const configureStore = history => {
  const oidcMiddleware = createOidcMiddleware(userManager);
  const allReducers = createRootReducer(history);

  const store = createStore(
    allReducers,
    applyMiddleware(
      oidcMiddleware,
      thunkMiddleware,
      routerMiddleware(history),
      logger
    )
  );

  return store;
};

export default configureStore;
