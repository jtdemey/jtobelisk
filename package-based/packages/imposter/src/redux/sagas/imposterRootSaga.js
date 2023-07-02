import { takeEvery, takeLatest } from 'redux-saga/effects';
import { gameTick, submitHostGame, submitJoinGame } from '../imposterSlice';
import { gameTickSaga } from './gameTickSaga';
import { submitHostSaga } from './submitHostSaga';
import { submitJoinSaga } from './submitJoinSaga';

export function* watcherSaga() {
	yield takeEvery(gameTick.type, gameTickSaga);
  yield takeLatest(submitHostGame.type, submitHostSaga);
  yield takeLatest(submitJoinGame.type, submitJoinSaga);
}