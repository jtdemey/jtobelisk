import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import imposterReducer from './imposterSlice';
import { watcherSaga } from './sagas/imposterRootSaga';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  game: imposterReducer
});

const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  reducer: reducer
});

sagaMiddleware.run(watcherSaga);

export default store;