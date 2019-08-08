import {
  selectPomodoroTaskA,
  resetPomodoroA,
  toggleTimerA
} from './../actions/pomodoro'
import { defaultState } from '../defaultState'
import { createReducer } from './createReducer'
import { TState, TPomodoro } from '../../types/state'
import {
  tickA,
  toggleStopwatchA,
  setLengthA,
  resetStopwatchA,
  setTimeDevA,
  toggleSelectingTaskA
} from '../actions/pomodoro'
import { ReducerCases } from '../actions/types'

const TICK = (pom: TPomodoro, action: ReturnType<typeof tickA>) => {
  if (pom.currSeconds > 0 && !pom.paused) {
    // just a double check
    pom.currSeconds -= 1
  } else {
    pom.paused = true
    pom.working = !pom.working
    pom.currSeconds = !pom.working ? pom.workSeconds : pom.breakSeconds
  }
}
const TOGGLE_TIMER = (
  pom: TPomodoro,
  action: ReturnType<typeof toggleTimerA>
) => {
  pom.paused = !pom.paused
}

const RESET_POMODORO = (
  pomodoro: TPomodoro,
  action: ReturnType<typeof resetPomodoroA>
) => defaultState.pomodoro

const SELECT_POMODORO_TASK = (
  pom: TPomodoro,
  action: ReturnType<typeof selectPomodoroTaskA>
) => {
  pom.selectingTask = false

  if (action.taskId === pom.selectedTaskId) {
    pom.selectedTaskId = null // deselect
  } else {
    pom.selectedTaskId = action.taskId
  }
}

const TOGGLE_SELECTING_TASK = (
  pom: TPomodoro,
  action: ReturnType<typeof toggleSelectingTaskA>
) => {
  pom.selectingTask = !pom.selectingTask
}

const SET_TIME_DEV = (
  pom: TPomodoro,
  action: ReturnType<typeof setTimeDevA>
) => {
  pom.currSeconds = 4
}

const TICK_STOPWATCH = (pom: TPomodoro, action: ReturnType<typeof tickA>) => {
  pom.stopWatch.time += 1
  pom.stopWatch.highest = Math.max(pom.stopWatch.time, pom.stopWatch.highest)
}

const TOGGLE_STOPWATCH = (
  pom: TPomodoro,
  action: ReturnType<typeof toggleStopwatchA>
) => {
  pom.stopWatch.paused = !pom.stopWatch.paused
}

const RESET_STOPWATCH = (
  pom: TPomodoro,
  action: ReturnType<typeof resetStopwatchA>
) => {
  // don't reset highscore!
  pom.stopWatch.time = 0
  pom.stopWatch.paused = true
}

const SET_LENGTH_MINUTES = (
  pom: TPomodoro,
  action: ReturnType<typeof setLengthA>
) => {
  const slice = action.operationType === 'WORK' ? 'workSeconds' : 'breakSeconds'

  const changingCurrent =
    (action.type === 'CHANGE_WORK_TIME' && pom.working) ||
    (action.type === 'CHANGE_BREAK_TIME' && !pom.working)

  const result = pom[slice] + action.minutes * 60

  if (result >= 0) {
    const newSeconds = changingCurrent
      ? pom.currSeconds + action.minutes * 60
      : pom.currSeconds

    pom.currSeconds = newSeconds
    pom[slice] = result
  }
}

export const pomodoroReducer = createReducer<TState['pomodoro']>(
  defaultState.pomodoro,
  {
    TICK,
    TOGGLE_TIMER,
    SET_LENGTH_MINUTES,
    RESET_POMODORO,
    SELECT_POMODORO_TASK,
    TOGGLE_SELECTING_TASK,
    SET_TIME_DEV,
    TICK_STOPWATCH,
    TOGGLE_STOPWATCH,
    RESET_STOPWATCH
  } as ReducerCases<TState['pomodoro']>
)
