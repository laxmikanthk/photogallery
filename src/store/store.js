import { createStore, applyMiddleware } from "redux";
import createSagaMiddleWare from "redux-saga";
import rootSaga from "../sagas/saga";
import { Reducer } from "../reducers/reducer";

const sagaMiddleWare = createSagaMiddleWare();

const store = createStore(Reducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);

export default store;
