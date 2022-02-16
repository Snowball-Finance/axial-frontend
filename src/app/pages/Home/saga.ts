import { takeLatest } from "redux-saga/effects";
import { HomePageActions } from "./slice";

// import { actions } from './slice';

export function* getHomePageInitialData(action: {
  type: string;
  payload: { id: string };
}) {}

export function* homePageSaga() {
  yield takeLatest(
    HomePageActions.getHomePageInitialDataAction.type,
    getHomePageInitialData
  );
}
