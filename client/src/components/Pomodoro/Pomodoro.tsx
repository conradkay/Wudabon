import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  withStyles,
  createStyles,
  Theme,
  WithStyles,
  DialogTitle,
  IconButton,
  Tabs,
  Tab,
  Card
} from '@material-ui/core'
import { Close, Settings } from '@material-ui/icons'
import { toggleTimerA, tickA } from '../../store/actions/pomodoro'
import { toDaysHHMMSS } from '../../utils/convertToTime'
import { Swal } from './Swal'
import { Controls } from './Controls'
import { Display } from './Display'
import { Stopwatch } from './Stopwatch'
import { TState } from '../../types/state'

const styles = (theme: Theme) =>
  createStyles({
    card: {
      position: 'fixed',
      bottom: theme.spacing(4),
      outline: 'none',
      left: theme.spacing(4),
      maxWidth: 700,
      minWidth: 300,
      zIndex: 1099,
      backgroundColor: '#f2f2f2'
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  })
// i do not
interface OwnProps {
  open: boolean
  stateFunc(next: boolean): void
}
type TProps = ReturnType<typeof mapState> &
  typeof actionCreators &
  OwnProps &
  WithStyles<typeof styles>

let interval: NodeJS.Timeout = setInterval(() => null, Infinity)

const CPomodoro = (props: TProps) => {
  const [tab, setTab] = useState(0)

  const pomodoro = props.pomodoro

  React.useEffect(() => {
    clearInterval(interval)

    interval = setInterval(() => {
      if (!pomodoro.paused) {
        if (pomodoro.selectedTaskId && pomodoro.working) {
          props.tick({
            taskId: pomodoro.selectedTaskId,
            projectId: '' // FIXME
            /* projectId: getProjectIdFromTaskId(
              props.projects,
              pomodoro.selectedTaskId
            ) */
          })
        } else {
          props.tick({})
        }
      }

      // set tab title

      document.title = pomodoro.paused
        ? 'Mantella'
        : `${pomodoro.working ? 'Work ' : 'Break '} ${toDaysHHMMSS(
            pomodoro.currSeconds - 1
          )}`
    }, 1000)
  })

  const toggleWorking = () => {
    props.toggleTimer()
  }

  const { open, classes, stateFunc } = props
  const time = toDaysHHMMSS(pomodoro.currSeconds)

  Swal(pomodoro, stateFunc, () => toggleWorking())

  return (
    <div>
      {open && (
        <Card className={classes.card}>
          <DialogTitle>Pomodoro</DialogTitle>
          <IconButton
            className={classes.closeButton}
            onClick={() => stateFunc(false)}
          >
            <Close />
          </IconButton>
          {tab === 0 && (
            <Display toggleWorking={() => toggleWorking()} timeLeft={time} />
          )}
          {tab === 1 && <Controls />}
          {tab === 2 && <Stopwatch />}
          <Tabs value={tab} onChange={(e, v: number) => setTab(v)}>
            <Tab label="Clock" />
            <Tab icon={<Settings />} />
            <Tab label="Stopwatch" />
          </Tabs>
        </Card>
      )}
    </div>
  )
}

const mapState = (state: TState) => ({
  pomodoro: state.pomodoro
  // projects: state.projects,
  // tasks: getAllTasks(state.projects)
})

const actionCreators = {
  toggleTimer: toggleTimerA,
  tick: tickA
}

export const Pomodoro = connect(
  mapState,
  actionCreators
)(withStyles(styles)(CPomodoro))
