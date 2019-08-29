import gql from 'graphql-tag'
import { userFields } from '../fragments'

// language="GraphQL"
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

// language="GraphQL"
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

// language="GraphQL"
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

// language="GraphQL"
export const GQL_LOGOUT = gql`
  mutation logout {
    logout {
      id
    }
  }
`
