import {
  useInjectReducer as useReducer,
  useInjectSaga as useSaga,
} from "redux-injectors";
import {
  InjectReducerParams,
  InjectSagaParams,
  RootStateKeyType,
} from "./types/injector-typings";

/* Wrap redux-injectors with stricter types */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useInjectReducer<Key extends RootStateKeyType>(
  params: InjectReducerParams<Key>
) {
  return useReducer(params);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useInjectSaga(params: InjectSagaParams) {
  return useSaga(params);
}
