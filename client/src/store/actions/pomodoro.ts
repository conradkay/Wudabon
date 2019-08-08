export const toggleTimerA = () => ({ type: 'START_TIMER' })

export const setLengthA = (args: {
  type: 'BREAK' | 'WORK'
  byMinutes: number
}) => ({
  type: 'SET_LENGTH_MINUTES',
  operationType: args.type,
  minutes: args.byMinutes
})

export const tickA = (args: { taskId?: string; projectId?: string }) => ({
  type: 'TICK',
  taskId: args.taskId,
  projectId: args.projectId
})

export const resetPomodoroA = () => ({ type: 'RESET_POMODORO' })

export const selectPomodoroTaskA = (taskId: null | string) => ({
  type: 'SELECT_POMODORO_TASK',
  taskId
})

export const toggleSelectingTaskA = () => ({
  type: 'TOGGLE_SELECTING_TASK'
})

export const setTimeDevA = () => ({
  type: 'SET_TIME_DEV'
})

export const tickStopwatchA = () => ({
  type: 'TICK_STOPWATCH'
})

export const toggleStopwatchA = () => ({
  type: 'TOGGLE_STOPWATCH'
})

export const resetStopwatchA = () => ({
  type: 'RESET_STOPWATCH'
})

export type PomodoroAction =
  | ReturnType<typeof toggleTimerA>
  | ReturnType<typeof setLengthA>
  | ReturnType<typeof tickA>
  | ReturnType<typeof resetPomodoroA>
  | ReturnType<typeof selectPomodoroTaskA>
  | ReturnType<typeof toggleSelectingTaskA>
  | ReturnType<typeof setTimeDevA>
  | ReturnType<typeof tickStopwatchA>
  | ReturnType<typeof toggleStopwatchA>
  | ReturnType<typeof resetStopwatchA>
