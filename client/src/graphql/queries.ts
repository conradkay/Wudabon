import { userFields } from './fragments'
import gql from 'graphql-tag'

export const GQL_GET_USER = gql`
  ${userFields}

  query user($id: String!) {
    user(id: $id) {
      ...userFields
    }
  }
`
