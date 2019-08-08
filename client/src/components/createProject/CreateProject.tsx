import * as React from 'react'

import {
  withStyles,
  WithStyles,
  Avatar,
  Typography,
  Button,
  TextField,
  CircularProgress
} from '@material-ui/core'
import { formStyles } from '../styles/formStyles'
import { CalendarTodayRounded } from '@material-ui/icons'
import { connect } from 'react-redux'
import { Change } from '../../types/types'
import { TState } from '../../types/state'
import { useState } from 'react'
import { openSnackbarA } from '../../store/actions/snackbar'
import { useMutation } from '@apollo/react-hooks'
import {
  CreateProjectMutation,
  CreateProjectMutationVariables
} from '../../graphql/types'
import { GQL_CREATE_PROJECT } from '../../graphql/mutations/project'
import { setProjectA } from '../../store/actions/project'

type CreateProjectProps = WithStyles<typeof formStyles> &
  typeof actionCreators &
  ReturnType<typeof mapState>

const CCreateProject = (props: CreateProjectProps) => {
  const [name, setName] = useState('')

  const [createProjectExec, { loading }] = useMutation<
    CreateProjectMutation,
    CreateProjectMutationVariables
  >(GQL_CREATE_PROJECT, {
    onCompleted: ({ createProject }) => {
      if (createProject && createProject.id) {
        props.setProject({
          id: createProject.id,
          newProj: createProject
        })

        window.location.hash = '#/project/' + createProject!.id
        props.openSnackbar('Project Created Successfully', 'success')
      } else {
        props.openSnackbar('Project Could Not Be Created', 'warning')
      }
    },
    onError: (error: any) => {
      props.openSnackbar('Error when creating project', 'error')
    }
  })

  const { classes } = props

  return (
    <>
      <main style={{ margin: 'auto' }} className={classes.layout}>
        <form
          onSubmit={e => {
            e.preventDefault()

            if (props.user) {
              createProjectExec({
                variables: {
                  name: name || 'Unnamed Project'
                }
              })
            } else {
              props.openSnackbar("You havn't logged in, silly goose", 'warning')
            }
          }}
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <CalendarTodayRounded />
            </Avatar>
            <Typography style={{ fontSize: 17 }}>Create Project</Typography>
            {loading && <CircularProgress style={{ margin: '4px auto' }} />}
            <div style={{ display: 'flex', width: '100%' }}>
              <TextField
                autoFocus
                label="Project Name"
                value={name}
                fullWidth
                onChange={(e: Change) => setName(e.target.value)}
                required
              />
              <div style={{ marginLeft: 12, marginTop: 'auto' }}>
                <Button
                  style={{ marginTop: 'auto' }}
                  variant="contained"
                  color="secondary"
                  type="submit"
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  )
}

const mapState = (state: TState) => ({
  user: state.user
})
const actionCreators = {
  openSnackbar: openSnackbarA,
  setProject: setProjectA
}

export const CreateProject = connect(
  mapState,
  actionCreators
)(withStyles(formStyles)(CCreateProject))
