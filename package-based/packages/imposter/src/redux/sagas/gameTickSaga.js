import { put, select } from "redux-saga/effects";
import {
  assignScenario,
  changeGameView,
  clearTempPhaseData,
  syncGameState,
  updatePlayers
} from "../imposterSlice";

const PHASE_TO_VIEW = [
  3, //Lobby
  4, //Ingame
  5, //Bystander win
  6, //Time expired
  7 //Wrong accusation
];

const detectPlayersDelta = (ogPlayers, newPlayers) => {
  if (ogPlayers.length !== newPlayers.length) {
    return true;
  }
  let diff = false;
  ogPlayers.forEach((p, i) => {
    const n = newPlayers[i];
    for (let [key, val] of Object.entries(p)) {
      if (key === "socket") continue;
      if (n[key] !== val) {
        diff = true;
      }
    }
  });
  return diff;
};

export function* gameTickSaga(action) {
  try {
    const gs = action.payload;
    yield put(syncGameState(gs));
    const scenarioDelta = yield select(state => state.game.scenario !== gs.scenario);
    if (scenarioDelta) {
      console.log(scenarioDelta);
      yield put(
        assignScenario({
          condition: gs.condition,
          imposterId: gs.imposterId,
          roles: gs.roles,
          scenario: gs.scenario,
          scenarioList: gs.scenarioList
        })
      );
    }
    const playersDelta = yield select(state => detectPlayersDelta(state.game.players, gs.players));
    if (playersDelta) {
      console.log(playersDelta);
      yield put(updatePlayers(gs.players));
    }
    const currentPhase = yield select(state => state.game.phase);
    console.log(currentPhase, gs.phase);
    if (currentPhase !== gs.phase) {
      console.log('hit');
      yield put(clearTempPhaseData());
      yield put(changeGameView(PHASE_TO_VIEW[gs.phase]));
    }
  } catch (err) {
    console.error(err);
  }
}
