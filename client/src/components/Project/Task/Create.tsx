import React, { useState } from 'react'
import { Dialog, DialogTitle, TextField } from '@material-ui/core'
import { setTaskA } from '../../../store/actions/task'
import { connect } from 'react-redux'

const actionCreators = {
  setTask: setTaskA
}

type OwnProps = {
  onClose: () => void
  projectId: string
}

type TProps = OwnProps & typeof actionCreators

export const CreateTask = connect(
  null,
  actionCreators
)((props: TProps) => {
  const [name, setName] = useState('')
  const [importance, setImportance] = useState(0)

  return (
    <Dialog open onClose={() => props.onClose()}>
      <form
        style={{ minWidth: 500, padding: '0px 16px 12px 16px' }}
        onSubmit={e => {
          e.preventDefault()
          props.onClose()
        }}
      >
        <DialogTitle style={{ paddingLeft: 0 }}>Create Task</DialogTitle>
        <TextField
          value={name}
          label="name"
          variant="outlined"
          fullWidth
          onChange={e => setName(e.target.value)}
        />

        <TextField
          margin="dense"
          value={importance}
          onChange={e => setImportance(parseInt(e.target.value))}
          variant="outlined"
          style={{ margin: '12px 6px 12px 0px', width: 'calc(50% - 6px)' }}
          type="number"
        />

        <TextField
          margin="dense"
          value={importance}
          onChange={e => setImportance(parseInt(e.target.value))}
          variant="outlined"
          style={{ margin: '12px 0px 12px 6px', width: 'calc(50% - 6px)' }}
          type="number"
        />
      </form>
    </Dialog>
  )
})
