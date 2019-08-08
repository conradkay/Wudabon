import React, { useState } from 'react'
import { Dialog, TextField, Button, DialogTitle } from '@material-ui/core'
import { connect } from 'react-redux'
import { TState } from '../../../types/state'
import { id } from '../../../utils/utilities'
import { GQL_EDIT_TASK } from '../../../graphql/mutations/task'
import { useMutation } from '@apollo/react-hooks'
import {
  EditTaskMutation,
  EditTaskMutationVariables
} from '../../../graphql/types'
import { setTaskA } from '../../../store/actions/task'

const mapState = (state: TState, ownProps: OwnProps) => {
  const project = state.projects[id(state.projects, ownProps.projectId)]

  return {
    task: project.tasks[id(project.tasks, ownProps.taskId)]
  }
}

const actionCreators = {
  setTask: setTaskA
}

type OwnProps = {
  onClose: () => void
  taskId: string
  projectId: string
}

type TProps = OwnProps & ReturnType<typeof mapState> & typeof actionCreators

export const EditTaskModal = connect(
  mapState,
  actionCreators
)((props: TProps) => {
  // apply changes locally (not in store) immediately, then when submit do on store and server
  const [task, setTask] = useState(props.task)

  const [editTaskExec] = useMutation<
    EditTaskMutation,
    EditTaskMutationVariables
  >(GQL_EDIT_TASK, {
    variables: {
      taskId: props.taskId,
      newTask: {
        name: task.name,
        points: task.points,
        dueDate: task.dueDate,
        // recurrance: task.recurrance,
        color: task.color
      },
      projId: props.projectId
    }
  })

  return (
    <div>
      <Dialog open onClose={() => props.onClose()}>
        <form
          onSubmit={e => {
            props.setTask({
              id: props.task.id,
              projectId: props.projectId,
              newTask: task
            })
            editTaskExec()
            e.preventDefault()
            props.onClose()
          }}
          style={{ minWidth: 500, padding: '0px 16px', paddingBottom: 12 }}
        >
          <DialogTitle style={{ paddingLeft: '0px' }}>Edit Task</DialogTitle>
          <TextField
            variant="outlined"
            color="secondary"
            label="Title"
            fullWidth
            value={task.name}
            onChange={e => setTask({ ...task, name: e.target.value })}
          />
          <div
            style={{
              display: 'flex',
              marginTop: 8,
              justifyContent: 'flex-end'
            }}
          >
            <Button color="secondary" type="submit" variant="contained">
              Save
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  )
})
