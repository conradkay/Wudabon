import React, { useState } from 'react'
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core'
import { setTaskA } from '../../store/actions/task'
import { connect } from 'react-redux'
import { TState } from '../../types/state'
import { DropResult, DragDropContext } from 'react-beautiful-dnd'
import { subDays, addDays } from 'date-fns'
import { WeekDay } from './WeekDay'
import { WeekControls } from './WeekControls'
import { differenceInCalendarDays } from 'date-fns'
import { getProjectIdFromTaskId, id } from '../../utils/utilities'

type TProps = ReturnType<typeof mapState> &
  typeof actionCreators &
  WithStyles<typeof styles>

/** Gets the day behind the passed date, the passed date, and the 5 dates after passed date */
const getDays = (start: Date): Date[] => {
  const result: Date[] = [subDays(start, 1), start]
  for (let i = 0; i < 5; i++) {
    result.push(addDays(start, i + 1)) // start at adding 1 day
  }

  return result
}

const styles = (theme: Theme) =>
  createStyles({
    dragContainer: {
      border: '1px solid #dadce0',
      borderRadius: '.8rem',
      overflowX: 'hidden',
      marginTop: 10
    },
    tasksContainer: {
      minHeight: 200,
      overflowX: 'auto',
      display: 'flex',
      flex: '1 1 auto'
    }
  })

const CWeek = withStyles(styles)((props: TProps) => {
  const [filterProjectId, setFilterProjectId] = useState(['-1'])
  const [baseDay, setBaseDay] = useState(new Date())

  const allTasks = props.projects.reduce((tasks, project) => {
    return [...tasks, ...project.tasks]
  }, [])

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result

    if (!destination || source.droppableId === destination.droppableId) {
      return // dragging outside boundaries or dropping into the same day
    }

    const task = allTasks[id(allTasks, draggableId)]

    const findNewDate = (taskDueDate: Date) => {
      const newDay = new Date(parseInt(destination.droppableId))

      const diff = differenceInCalendarDays(newDay, taskDueDate)

      return addDays(taskDueDate, diff)
    }

    const newTask = {
      ...task,
      dueDate: findNewDate(allTasks[id(allTasks, draggableId)].dueDate!)
    }

    props.setTask({
      id: draggableId,
      newTask,
      projectId: getProjectIdFromTaskId(props.projects, draggableId)
    })
  }

  const days = getDays(baseDay)
  return (
    <>
      <div style={{ margin: 20 }}>
        <WeekControls
          startDay={days[0]}
          currIds={filterProjectId}
          projects={props.projects}
          toggleProject={(projId: string[]) => {
            setFilterProjectId(projId)
          }}
          setDate={(newDay: Date) => setBaseDay(newDay)}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={props.classes.dragContainer}>
            <div className={props.classes.tasksContainer}>
              {days.map((day, i) => (
                <WeekDay
                  filteringProjects={filterProjectId}
                  day={day}
                  key={i}
                  index={i as any}
                />
              ))}
            </div>
          </div>
        </DragDropContext>
      </div>
    </>
  )
})

const mapState = (state: TState) => ({
  projects: state.projects
})

const actionCreators = {
  setTask: setTaskA
}

export const CalendarWeek = connect(
  mapState,
  actionCreators
)(CWeek)
