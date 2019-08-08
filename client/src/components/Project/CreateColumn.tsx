import * as React from 'react'
import { connect } from 'react-redux'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Theme,
  createStyles,
  WithStyles,
  IconButton,
  withStyles
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { Change } from '../../types/types'
import { setListA } from '../../store/actions/list'
import { TProject } from '../../types/project'
import { useState } from 'react'
import {
  CreateListMutation,
  CreateListMutationVariables
} from '../../graphql/types'
import { GQL_CREATE_LIST } from '../../graphql/mutations/list'
import { useMutation } from '@apollo/react-hooks'

interface OwnProps {
  project: TProject
  onClose(): void
}

type CreateColumnProps = typeof actionCreators &
  OwnProps &
  WithStyles<typeof styles>

const styles = (theme: Theme) =>
  createStyles({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  })

const CCreateColumn = (props: CreateColumnProps) => {
  const { project, onClose, classes } = props

  const [name, setName] = useState('')

  const [createListExec] = useMutation<
    CreateListMutation,
    CreateListMutationVariables
  >(GQL_CREATE_LIST, {
    onCompleted: ({ createList }) => {
      props.setList({
        id: createList.list!.id,
        projectId: props.project.id,
        newCol: {
          taskIds: [],
          id: createList.list!.id,
          name: createList.list!.name
        }
      })

      onClose()
    }
  })

  return (
    <Dialog open={true} onClose={onClose}>
      <form
        onSubmit={e => {
          e.preventDefault()
          createListExec({
            variables: {
              name: name || 'List',
              projId: project.id
            }
          })
        }}
      >
        <DialogTitle>Create List</DialogTitle>
        <IconButton className={classes.closeButton} onClick={onClose}>
          <Close />
        </IconButton>
        <DialogContent>
          <DialogContentText>
            Lists should contain either a type or date of task. Ex: "Amanda",
            "Completing", or "Writing"
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            label="Column Name"
            value={name}
            onChange={({ target }: Change) => setName(target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button fullWidth onClick={onClose} color="secondary">
            Cancel
          </Button>

          <Button fullWidth variant="contained" color="primary" type="submit">
            Create Column
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

const actionCreators = {
  setList: setListA
}

export const CreateColumn = connect(
  null,
  actionCreators
)(withStyles(styles)(CCreateColumn))
