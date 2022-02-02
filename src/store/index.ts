import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { load, save } from "redux-localstorage-simple"
import user, { initialState as userInitialState } from "./module/user"
import { createInjectorsEnhancer, forceReducerReload } from "redux-injectors";
import createSagaMiddleware from "redux-saga";
import application from "./application"
import { merge } from "lodash"
import { createReducer } from "./reducers";

const PERSISTED_KEYS: string[] = ["user"]
const stateFromStorage = load({
  states: PERSISTED_KEYS,
})
const store = configureStore({
  reducer: {
    application,
    user,
  },
  middleware: [
    ...getDefaultMiddleware({ thunk: false ,  serializableCheck: false}),
    save({ states: PERSISTED_KEYS }),
  ],
  preloadedState: merge({}, { user: userInitialState }, stateFromStorage),

})



export function configureAppStore(
  _initialState:any = {},
):any {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { run: runSaga } = sagaMiddleware;
  // Create the store with saga middleware
  const middlewares = [sagaMiddleware,save({ states: PERSISTED_KEYS }),];
  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  const store = configureStore({
    reducer: createReducer(),
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware({
        serializableCheck: false,
      }),
      ...middlewares,
    ],
    preloadedState: merge({}, { user: userInitialState }, stateFromStorage),
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== "production" ,
    enhancers,
  });

  // Make reducers hot reloadable, see http://mxs.is/googmo
//@ts-ignore
  if (module.hot) {
//@ts-ignore
    module.hot.accept("./reducers", () => {
      forceReducerReload(store);
    });
  }
  return store;
}



export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
