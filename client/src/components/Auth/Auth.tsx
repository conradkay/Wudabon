import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Paper,
  Grid,
  Button,
  withStyles,
  WithStyles,
  Avatar,
  Typography,
  IconButton,
  TextField,
  CircularProgress
} from '@material-ui/core'
import { LockOpen } from '@material-ui/icons'
import { formStyles } from '../styles/formStyles'
import { openSnackbarA } from '../../store/actions/snackbar'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
import { registerA, loginA } from '../../store/actions/auth'
import { Mutation, MutationResult } from 'react-apollo'
import {
  MutationResolvers,
  RegisterMutation,
  LoginMutation
} from '../../graphql/types'
import { GQL_REGISTER, GQL_LOGIN } from '../../graphql/mutations/auth'

type OwnProps = {
  authType: 'Register' | 'Login'
}
// I <3 Mantella
type TProps = WithStyles<typeof formStyles> & typeof actionCreators & OwnProps

const Auth = ({ authType, openSnackbar, classes, register, login }: TProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmText, setConfirmText] = useState('')
  const [username, setUsername] = useState('')

  return (
    <div style={{ margin: 20 }}>
      <Helmet>
        <style type="text/css">{` body { background-color: #1d364c; }`}</style>
        <meta
          content="Get started with Mantella today, totally free!"
          name={'description'}
        />
      </Helmet>
      <main className={classes.layout}>
        <Mutation
          onCompleted={(data: any) => {
            if (authType === 'Register') {
              const registerData: RegisterMutation = data
              if (
                registerData !== null &&
                registerData.register !== null &&
                registerData.register.user
              ) {
                register(registerData.register.user)
                window.location.hash = '#/dashboard'
              } else {
                openSnackbar(
                  'User with that Email already exists, Sorry!',
                  'error'
                )
              }
            } else if (authType === 'Login') {
              if (data && data.login && data.login.user) {
                login(data.login.user)
                window.location.hash = '#/dashboard'
              } else {
                openSnackbar('Could not login, oopsie!', 'error')
              }
            }
          }}
          onError={(error: any) => {
            openSnackbar('Could not Authenticate!', 'error')
          }}
          mutation={authType === 'Register' ? GQL_REGISTER : GQL_LOGIN}
        >
          {(
            auth: (args: {
              variables:
                | MutationResolvers.LoginArgs
                | MutationResolvers.RegisterArgs
            }) => any,
            result: MutationResult<LoginMutation & RegisterMutation>
          ) => {
            return (
              <form
                autoComplete="on"
                onSubmit={e => {
                  e.preventDefault()
                  if (authType === 'Register') {
                    auth({ variables: { username, password, email } })
                  } else {
                    auth({ variables: { email, password } })
                  }
                }}
              >
                <Paper className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <LockOpen />
                  </Avatar>
                  <Typography style={{ fontSize: 17 }}>{authType}</Typography>
                  {authType === 'Register' && (
                    <Button
                      component={Link}
                      to="/login"
                      variant="outlined"
                      style={{ marginTop: 10 }}
                    >
                      Login Instead
                    </Button>
                  )}
                  {/* Full Name */}
                  {authType === 'Register' && (
                    <TextField
                      margin="dense"
                      fullWidth
                      required
                      autoComplete="off"
                      onChange={e => setUsername(e.target.value)}
                      value={username}
                      label="Full Name"
                    />
                  )}
                  <TextField
                    margin="dense"
                    fullWidth
                    name="email"
                    required
                    autoComplete="on"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value)
                    }}
                    label="Email"
                    type="email"
                  />
                  {/* password */}
                  <TextField
                    margin="dense"
                    fullWidth
                    required
                    autoComplete="on"
                    label="Password"
                    name="password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  {/* confirm password */}
                  {authType === 'Register' && (
                    <TextField
                      type="password"
                      margin="dense"
                      fullWidth
                      required
                      autoComplete="off"
                      label="Confirm Password"
                      error={confirmText !== password}
                      value={confirmText}
                      onChange={e => setConfirmText(e.target.value)}
                    />
                  )}
                  {/* submit button */}
                  <Grid
                    container
                    justify="center"
                    style={{ marginTop: '10px' }}
                  >
                    {result.loading && (
                      <CircularProgress style={{ margin: '4px auto' }} />
                    )}

                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      disabled={
                        authType === 'Register'
                          ? password.trim() === '' || password !== confirmText
                          : false
                      }
                      type="submit"
                      style={{
                        marginTop: 10
                      }}
                    >
                      {authType}
                    </Button>
                  </Grid>
                  <Grid
                    container
                    style={{ marginTop: 15 }}
                    alignContent="space-between"
                  >
                    <IconButton>
                      <img
                        src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png"
                        style={{ height: 50, width: 50 }}
                      />
                    </IconButton>
                    <IconButton style={{ marginLeft: 8 }}>
                      <img
                        src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/facebook_circle-512.png"
                        style={{ height: 50, width: 50 }}
                      />
                    </IconButton>
                    <IconButton style={{ marginLeft: 8 }}>
                      <img
                        src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-512.png"
                        style={{ height: 50, width: 50 }}
                      />
                    </IconButton>
                    <IconButton style={{ marginLeft: 8 }}>
                      <img
                        src="https://cdn3.iconfinder.com/data/icons/social-icons-5/607/Twitterbird.png"
                        style={{ height: 50, width: 50 }}
                      />
                    </IconButton>
                  </Grid>
                </Paper>
              </form>
            )
          }}
        </Mutation>
      </main>
    </div>
  )
}

const actionCreators = {
  openSnackbar: openSnackbarA,
  register: registerA,
  login: loginA
}

export const AuthRender = withStyles(formStyles)(
  connect(
    null,
    actionCreators
  )(Auth)
)
