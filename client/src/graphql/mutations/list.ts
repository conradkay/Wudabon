import gql from 'graphql-tag'
import { projectFields, listFields } from '../fragments'

export const GQL_CREATE_LIST = gql`
  ${projectFields}

  mutation createList($name: String!, $projId: String!) {
    createList(projId: $projId, name: $name) {
      project {
        ...projectFields
      }
      list {
        ...listFields
      }
    }
  }
`

export const GQL_DELETE_LIST = gql`
  mutation deleteList($projectId: String!, $id: String!) {
    deleteList(projId: $projectId, id: $id) {
      id
    }
  }
`

export const GQL_EDIT_LIST = gql`
  ${listFields}

  mutation editList($id: String!, $projectId: String!, $newList: ListInput!) {
    editList(listId: $id, projId: $projectId, newList: $newList) {
      list {
        ...listFields
      }
      project {
        ...projectFields
      }
    }
  }
`
