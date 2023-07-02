import { delay, put } from 'redux-saga/effects';
import { IMPOSTER_VIEWS, SOCKET_COMMANDS } from '../imposterConstants';
import { changeGameView, emitSocketMsg } from '../imposterSlice';

export function* submitHostSaga(action) {
  try {
		yield put(changeGameView(IMPOSTER_VIEWS.LOADING));
		yield put(emitSocketMsg({
			command: SOCKET_COMMANDS.SUBMIT_HOST_GAME,
			socketId: action.payload.socketId,
			...action.payload
		}));
  } catch(err) {
    console.error(err);
  }
}