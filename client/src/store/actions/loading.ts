export const resumeLoadingA = (): TStartLoading => ({
  type: 'START_LOADING'
})
export const stopLoadingA = (): TStopLoading => ({
  type: 'STOP_LOADING'
})

export type TStartLoading = { type: 'START_LOADING' }
export type TStopLoading = { type: 'STOP_LOADING' }

export type LoadingAction = TStartLoading | TStopLoading
