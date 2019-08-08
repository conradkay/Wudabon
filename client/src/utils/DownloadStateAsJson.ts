import { TState } from '../types/state'

export const downloadStateAsJson = (state: TState) => {
  const newStateJSON = JSON.stringify({
    ...state,
    pomodoro: { ...state.pomodoro, paused: true }
  })

  const dataStr =
    'data:text/json;charset=utf-8,' + encodeURIComponent(newStateJSON)
  const downloadAnchorNode = document.createElement('a')

  downloadAnchorNode.setAttribute('href', dataStr)
  downloadAnchorNode.setAttribute('download', 'kanban-brawn-save.json')
  document.body.appendChild(downloadAnchorNode) // required for firefox
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}
