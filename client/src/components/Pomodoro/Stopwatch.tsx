import React, { CSSProperties, useEffect } from 'react'
import { connect } from 'react-redux'
import { TState } from '../../types/state'
import { toDaysHHMMSS } from '../../utils/convertToTime'
import {
  tickStopwatchA,
  toggleStopwatchA,
  resetStopwatchA
} from '../../store/actions/pomodoro'
import { Button } from '@material-ui/core'
import { Transition } from 'react-spring/renderprops'
import { centerChildren } from '../styles/utils'
import { PlayArrow, Pause } from '@material-ui/icons'

type TProps = ReturnType<typeof mapState> & typeof actionCreators

let interval: NodeJS.Timeout = setInterval(() => null, Infinity)

const CStopwatch = (props: TProps) => {
  useEffect(() => {
    clearInterval(interval)

    interval = setInterval(() => {
      if (!props.stopWatch.paused) {
        props.tickStopwatch()
      }
    }, 1000)
  })

  const { stopWatch, reset } = props
  return (
    <div style={{ margin: 10 }}>
      <div
        style={{
          textAlign: 'center',
          fontSize: 28,
          marginBottom: 10,
          color: stopWatch.time >= stopWatch.highest ? '#FFD700' : 'black'
        }}
      >
        {toDaysHHMMSS(stopWatch.time)}
      </div>
      <Transition
        items={stopWatch.time < stopWatch.highest}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {show => {
          const style: CSSProperties = {
            fontSize: 28,
            color: '#444',
            marginBottom: 10
          }
          return (
            show &&
            (transitionStyles => (
              <div style={{ ...style, ...transitionStyles, ...centerChildren }}>
                Best: {toDaysHHMMSS(stopWatch.highest)}
              </div>
            ))
          )
        }}
      </Transition>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => reset()} style={{ marginRight: 4 }}>
          Reset
        </Button>
        <Button onClick={props.toggleStopwatch} color="secondary">
          {stopWatch.paused ? (
            <PlayArrow style={{ marginRight: 4 }} />
          ) : (
            <Pause style={{ marginRight: 4 }} />
          )}
          {stopWatch.paused ? 'Start' : 'Stop'}
        </Button>
      </div>
    </div>
  )
}

const mapState = (state: TState) => ({
  stopWatch: state.pomodoro.stopWatch
})

const actionCreators = {
  tickStopwatch: tickStopwatchA,
  toggleStopwatch: toggleStopwatchA,
  reset: resetStopwatchA
}

export const Stopwatch = connect(
  mapState,
  actionCreators
)(CStopwatch)
