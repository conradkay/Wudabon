import gql from 'graphql-tag'

import { projectFields } from '../fragments'

export const GQL_CREATE_PROJECT = gql`
  ${projectFields}

  mutation createProject($name: String!) {
    createProject(name: $name) {
      ...projectFields
    }
  }
`

export const GQL_DELETE_PROJECT = gql`
  mutation deleteProject($id: String!) {
    deleteProject(id: $id) {
      id
    }
  }
`

export const GQL_EDIT_PROJECT = gql`
  ${projectFields}

  mutation editProject($id: String!, $newProj: ProjectInput!) {
    editProject(newProj: $newProj, id: $id) {
      ...projectFields
    }
  }
`
