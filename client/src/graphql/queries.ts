import { projectFields, userFields } from './fragments'
import gql from 'graphql-tag'

export const GQL_GET_PROJECT = gql`
  ${projectFields}

  query project($id: String!) {
    projectById(id: $id) {
      ...projectFields
    }
  }
`

export const GQL_GET_PROJECTS = gql`
  ${projectFields}

  query projects($ids: [String!]!) {
    projects(ids: $ids) {
      ...projectFields
    }
  }
`

export const GQL_GET_USER = gql`
  ${userFields}

  query user($id: String!) {
    user(id: $id) {
      ...userFields
    }
  }
`
