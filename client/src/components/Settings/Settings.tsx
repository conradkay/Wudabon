import React from 'react'
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  ListSubheader,
  ListItem,
  ListItemText,
  Button
} from '@material-ui/core'
import { List } from '@material-ui/core'

import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Mutation, MutationResult } from 'react-apollo'
import { openSnackbarA } from '../../store/actions/snackbar'
import { LogoutMutation, LogoutMutationVariables } from '../../graphql/types'
import { GQL_LOGOUT } from '../../graphql/mutations/auth'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundColor: theme.palette.background.paper,
      width: '95%',
      marginTop: 50
    }
  })

type TProps = WithStyles<typeof styles> & typeof actionCreators

const CSettings = (props: TProps) => {
  const { classes } = props
  return (
    <>
      <div>
        <Helmet>
          <style>{'body { background-color: #eeeeee; }'}</style>
        </Helmet>
        <List
          subheader={<ListSubheader>Data</ListSubheader>}
          className={classes.root}
        >
          <ListItem>
            <ListItemText
              primary="Signout"
              secondary="This action cannot be undone"
            />
            <Mutation
              mutation={GQL_LOGOUT}
              onCompleted={() => {
                location.href = '#/'
                location.reload()
              }}
              onError={() => {
                props.openSnackbar('You are stuck here forever, oops!', 'error')
              }}
            >
              {(
                logout: (args: { variables: LogoutMutationVariables }) => any,
                result: MutationResult<LogoutMutation>
              ) => {
                return (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => logout({ variables: {} })}
                    style={{
                      marginLeft: 'auto'
                    }}
                  >
                    Signout
                  </Button>
                )
              }}
            </Mutation>
          </ListItem>
        </List>
      </div>
    </>
  )
}

const actionCreators = {
  openSnackbar: openSnackbarA
}

export const Settings = connect(
  null,
  { ...actionCreators }
)(withStyles(styles)(CSettings))
