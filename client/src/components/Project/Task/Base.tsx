import React, { useState, useEffect, useRef } from 'react'
import { TTask, TSubtask } from '../../../types/project'
import { connect } from 'react-redux'
import { TState } from '../../../types/state'
import {
  selectPomodoroTaskA,
  toggleTimerA
} from '../../../store/actions/pomodoro'
import {
  LinearProgress,
  Badge,
  createStyles,
  WithStyles,
  withStyles,
  IconButton,
  Tooltip
} from '@material-ui/core'
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { formatDueDate } from '../../../utils/formatDueDate'
import { toDaysHHMMSS } from '../../../utils/convertToTime'
import {
  CheckBox,
  CheckBoxOutlineBlankOutlined,
  PlayArrow,
  Pause,
  Comment,
  List
} from '@material-ui/icons'
import { hasPassed } from '../../../utils/hasPassed'
import { Transition, animated } from 'react-spring/renderprops'
import { TProject } from '../../../types/project'
import { selectMemberA } from '../../../store/actions/project'

const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef(undefined as any)

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  })

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
    return
  }, [delay])
}

export const SubtaskMap = ({
  subTasks,
  onCheckbox,
  taskId,
  show
}: {
  subTasks: TSubtask[]
  onCheckbox: (subId: string) => void
  taskId: string
  show: boolean
}) => (
  <div style={{ marginLeft: 30 }}>
    <Transition
      initial={null}
      native
      items={show ? subTasks.filter(subTask => !subTask.completed) : []}
      keys={
        show
          ? subTasks
              .filter(subTask => !subTask.completed)
              .map(subTask => subTask.id)
          : []
      }
      from={{ opacity: 1, height: 0, overflow: 'hidden' }}
      enter={{ opacity: 1, height: 'auto' }}
      leave={{ opacity: 0, height: 0, overflow: 'hidden' }}
    >
      {subTask => props => (
        <animated.div
          style={{
            display: 'flex',
            alignItems: 'center',
            ...props
          }}
        >
          <div
            style={{
              marginTop: 6
            }}
          >
            {subTask.completed ? (
              <CheckBox
                onClick={e => {
                  e.stopPropagation()
                  onCheckbox(subTask.id)
                }}
              />
            ) : (
              <CheckBoxOutlineBlankOutlined
                onClick={e => {
                  e.stopPropagation()
                  onCheckbox(subTask.id)
                }}
              />
            )}
          </div>
          <span style={{ marginLeft: 8 }}>{subTask.name}</span>
        </animated.div>
      )}
    </Transition>
  </div>
)

interface OwnProps {
  project: TProject
  task: TTask
  provided: DraggableProvided
  snapshot: DraggableStateSnapshot
  openFunc(): void
}

const styles = () =>
  createStyles({
    badgeColor: {
      backgroundColor: '#4caf50'
    },
    badge: {
      marginTop: 15,
      marginRight: 15
      // position: 'relative'
    },
    input: {
      cursor: 'inherit',
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      margin: 0,
      padding: 0
    },
    play: {
      padding: 6,
      marginRight: 2,
      color: 'rgba(0, 0, 0, 0.54)'
    }
  })

type TaskProps = OwnProps &
  ReturnType<typeof mapState> &
  typeof actionCreators &
  WithStyles<typeof styles>

const CBaseTask = (props: TaskProps) => {
  const onClickCheckbox = (e: any) => {
    e.stopPropagation()
    // props.toggleCompleteTask(props.task.id, props.project.id)
  }

  const [showComments, setShowComments] = useState(false)
  const [showSubTasks, setShowSubTasks] = useState(true)

  const [formatDate, setFormatDate] = useState(formatDueDate(props.task, true))

  if (formatDueDate(props.task, true) !== formatDate) {
    setFormatDate(formatDueDate(props.task, true))
  }
  useInterval(() => {
    if (props.task.dueDate) {
      setFormatDate(formatDueDate(props.task, true))
    }
  }, 1000)

  const { task, isSelectingTask, provided, snapshot, openFunc, project } = props
  const MIN_HEIGHT = 20

  const border = '1px solid rgba(0, 0, 0, 0.12)'

  return task ? (
    <div style={{ width: '100%' }}>
      <div
        id={task.id.toString()}
        ref={provided ? provided.innerRef : undefined}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          minHeight: MIN_HEIGHT,
          backgroundColor: task.color ? task.color : 'white',
          border,
          borderBottom: task.subTasks.length ? 'none' : 'border',
          ...provided.draggableProps.style,
          color: snapshot ? (snapshot.isDragging ? 'gray' : 'black') : 'black',
          outline: 'none'
        }}
        onClick={() => {
          /* if (project && project.selectingMember) {
            props.stopSelectingMember({
              id: project.selectingMember,
              projectId: project.id
            })
          } else */ if (
            isSelectingTask
          ) {
            props.selectPomodoroTask(task.id.toString())
          } else {
            openFunc()
          }
        }}
      >
        <Badge
          classes={{
            colorSecondary: props.classes.badgeColor,
            badge: props.classes.badge
          }}
          color={'primary'}
          badgeContent={task.points}
          style={{
            width: '100%',
            display: 'flex',
            minHeight: MIN_HEIGHT,
            outline: 'none'
          }}
        >
          <div style={{ margin: 4, width: '100%', display: 'block' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  marginTop: 4
                }}
              >
                {task.progress === 2 ? (
                  <CheckBox onClick={onClickCheckbox} />
                ) : (
                  <CheckBoxOutlineBlankOutlined onClick={onClickCheckbox} />
                )}
              </div>
              <span
                id={task.id}
                style={{
                  fontSize: 18,
                  color: hasPassed(task.dueDate) ? '#d32f24' : 'black',
                  marginLeft: 8
                }}
              >
                <div style={{ display: 'flex' }}>
                  {task.security &&
                    task.security.assignedUsers.map(userId => {
                      const profile = project
                        ? {
                            username: 'user name',
                            profileImg:
                              'data:image/png;base64,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'
                          } // project.users[userId]
                        : undefined
                      return (
                        profile && (
                          <Tooltip key={userId} title={profile.username}>
                            <img
                              src={profile.profileImg}
                              style={{
                                marginRight: 8,
                                borderRadius: '50%',
                                height: 40,
                                width: 40
                              }}
                            />
                          </Tooltip>
                        )
                      )
                    })}
                  {task.name ? task.name : 'Unnamed Task'}
                </div>
              </span>
            </div>
            <SubtaskMap
              show={showSubTasks}
              subTasks={task.subTasks}
              taskId={task.id}
              onCheckbox={(subId: string) => {
                console.log('SUBTASK COMPLETE NOT IMPLEMENTED BY APOLLO YET')
                // props.completeSubTask(task.id, project.id, subId)
              }}
            />

            {task.comments.length !== 0 && (
              <Transition
                initial={null}
                items={showComments}
                from={{ height: 0, overflow: 'hidden' }}
                enter={{ height: 'auto' }}
                leave={{ height: 0, overflow: 'hidden' }}
              >
                {show =>
                  show &&
                  (style => (
                    <animated.div style={{ marginLeft: 6, ...style }}>
                      <div
                        style={{
                          paddingTop: 10,
                          paddingBottom: 10,
                          borderRadius: '.8rem'
                        }}
                      >
                        {task.comments.map(comment => (
                          <div key={comment.id} style={{ color: 'black' }}>
                            <span style={{ color: 'rgba(0, 0, 0, 0.70)' }}>
                              {
                                formatDueDate(
                                  {
                                    ...task,
                                    startDate: undefined,
                                    dueDate: new Date(comment.dateAdded),
                                    recurrance: undefined
                                  },
                                  false
                                ).split('Due')[1]
                              }
                            </span>
                            {'  -  '}
                            {comment.comment}
                          </div>
                        ))}
                      </div>
                    </animated.div>
                  ))
                }
              </Transition>
            )}
            {task.dueDate && (
              <>
                <div style={{ marginLeft: 6 }}>{formatDate}</div>
              </>
            )}

            <div
              style={{
                display: 'flex',
                cursor: 'pointer'
              }}
            >
              {Object.values(task.comments).length !== 0 && (
                <IconButton
                  className={props.classes.play}
                  onClick={e => {
                    e.stopPropagation()
                    setShowComments(!showComments)
                  }}
                >
                  <Comment />
                </IconButton>
              )}
              {Object.values(task.subTasks).length !== 0 && (
                <IconButton
                  style={{ marginRight: 8 }}
                  className={props.classes.play}
                  onClick={e => {
                    // eventually have it toggle icon based on current showSubtasks(same with comments)
                    e.stopPropagation()
                    setShowSubTasks(!showSubTasks)
                  }}
                >
                  <List />
                </IconButton>
              )}
              {task.timeWorkedOn !== 0 && (
                <span style={{ alignSelf: 'center' }}>
                  Worked on for {toDaysHHMMSS(task.timeWorkedOn, true)}
                </span>
              )}
              {!props.isCurrentTask ? (
                <PlayArrow
                  style={{ marginLeft: 'auto' }}
                  className={props.classes.play}
                  onClick={e => {
                    e.stopPropagation()
                    props.selectPomodoroTask(task.id)
                    props.toggleTimer()
                  }}
                />
              ) : (
                <Pause
                  style={{ marginLeft: 'auto' }}
                  className={props.classes.play}
                  onClick={e => {
                    e.stopPropagation()
                    props.selectPomodoroTask(task.id)
                    props.toggleTimer()
                  }}
                />
              )}
            </div>
          </div>
        </Badge>
        {task.subTasks.length !== 0 && (
          <LinearProgress
            style={{
              borderRadius: 0
            }}
            variant="determinate"
            color="secondary"
            value={
              task.progress === 2
                ? 100
                : (task.subTasks.filter(subTask => subTask.completed).length /
                    task.subTasks.length) *
                  100
            }
          />
        )}
      </div>
    </div>
  ) : null
}

const mapState = (state: TState, ownProps: OwnProps) => ({
  isSelectingTask: state.pomodoro.selectingTask,
  isCurrentTask: state.pomodoro.selectedTaskId === ownProps.task.id.toString(),
  pomodoro: state.pomodoro
})

const actionCreators = {
  selectPomodoroTask: selectPomodoroTaskA,
  stopSelectingMember: selectMemberA,
  toggleTimer: toggleTimerA,
  selectMember: selectMemberA
}

export const BaseTask = withStyles(styles)(
  connect(
    mapState,
    actionCreators
  )(CBaseTask)
)
