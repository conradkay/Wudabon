import gql from 'graphql-tag'
import { userFields } from '../fragments'

export const GQL_LOGIN = gql`
  ${userFields}
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        ...userFields
      }
    }
  }
`
export const GQL_REGISTER = gql`
  ${userFields}
  mutation register($username: String!, $password: String!, $email: String!) {
    register(username: $username, password: $password, email: $email) {
      user {
        ...userFields
      }
    }
  }
`

export const GQL_LOGIN_WITH_COOKIE = gql`
  ${userFields}
  mutation loginWithCookie {
    loginWithCookie {
      user {
        ...userFields
      }
    }
  }
`

export const GQL_LOGOUT = gql`
  mutation logout {
    logout {
      message
    }
  }
`
