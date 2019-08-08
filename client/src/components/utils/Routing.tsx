import { Route, Redirect, RouteProps } from 'react-router'
import { connect } from 'react-redux'
import { TState } from '../../types/state'
import React from 'react'

const mapState = (state: TState) => ({
  user: state.user
})

type TProps = ReturnType<typeof mapState> & {
  component: any
  componentProps: any
} & RouteProps

export const PrivateRoute = connect(mapState)(
  ({ component: PropComponent, componentProps, user, ...rest }: TProps) => {
    return (
      <Route
        {...rest}
        render={props =>
          user !== null ? (
            <PropComponent
              params={props.match.params}
              {...(componentProps as (typeof PropComponent)['props'])}
            />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    )
  }
)
export const PublicOnlyRoute = connect(mapState)(
  ({ component: PropComponent, componentProps, user, ...rest }: TProps) => {
    return (
      <Route
        {...rest}
        render={props =>
          user === null ? (
            <PropComponent
              {...componentProps}
              params={props.match.params}
              {...componentProps}
            />
          ) : (
            <Redirect to="/dashboard" />
          )
        }
      />
    )
  }
)
