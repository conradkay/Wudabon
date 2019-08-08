import React from 'react'
import { setLengthA } from '../../store/actions/pomodoro'
import { connect } from 'react-redux'
import { TState } from '../../types/state'
import { Button } from '@material-ui/core'
import { Add, Remove } from '@material-ui/icons'
import { toDaysHHMMSS } from '../../utils/convertToTime'

type TProps = ReturnType<typeof mapState> & typeof actionCreators

const CControls = (props: TProps) => {
  const { workTime, breakTime } = props

  return (
    <>
      <div style={{ textAlign: 'center', fontSize: 18, margin: 10 }}>
        Break Time: {toDaysHHMMSS(breakTime)}
      </div>
      <div style={{ display: 'flex' }}>
        <Button
          onClick={() => props.setLengthA({ type: 'BREAK', byMinutes: 1 })}
          color="secondary"
          style={{ width: '100%', marginLeft: 8, marginRight: 4 }}
        >
          <Add />
        </Button>
        <Button
          onClick={() => props.setLengthA({ type: 'BREAK', byMinutes: -1 })}
          color="primary"
          fullWidth
          style={{ width: '100%', marginLeft: 4, marginRight: 8 }}
        >
          <Remove />
        </Button>
      </div>
      <div
        style={{
          textAlign: 'center',
          fontSize: 18,
          margin: 10
        }}
      >
        Work Time: {toDaysHHMMSS(workTime)}
      </div>
      <div style={{ display: 'flex' }}>
        <Button
          onClick={() => props.setLengthA({ type: 'WORK', byMinutes: 5 })}
          color="secondary"
          style={{ width: '100%', marginLeft: 8, marginRight: 4 }}
        >
          <Add />
        </Button>
        <Button
          onClick={() => props.setLengthA({ type: 'WORK', byMinutes: -5 })}
          color="primary"
          fullWidth
          style={{ width: '100%', marginLeft: 4, marginRight: 8 }}
        >
          <Remove />
        </Button>
      </div>
    </>
  )
}

const mapState = (state: TState) => ({
  workTime: state.pomodoro.workSeconds,
  breakTime: state.pomodoro.breakSeconds
})

const actionCreators = {
  setLengthA
}

export const Controls = connect(
  mapState,
  actionCreators
)(CControls)
