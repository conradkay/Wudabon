import { projectFields, taskFields } from './../fragments'
import gql from 'graphql-tag'

export const GQL_SET_SUBTASK = gql`
  ${taskFields}

  mutation setSubtask(
    $projId: String!
    $taskId: String!
    $subtaskId: String!
    $info: SubtaskInfo
  ) {
    setSubtask(
      projId: $projId
      taskId: $taskId
      subtaskId: $subtaskId
      info: $info
    ) {
      ...taskFields
    }
  }
`
export const GQL_SET_COMMENT = gql`
  ${taskFields}

  mutation setComment(
    $projId: String!
    $taskId: String!
    $commentId: String!
    $description: String
  ) {
    setComment(
      projId: $projId
      taskId: $taskId
      commentId: $commentId
      description: $description
    ) {
      ...taskFields
    }
  }
`

export const GQL_CREATE_TASK = gql`
  ${projectFields}

  mutation createTask(
    $taskInfo: TaskInput!
    $projId: String!
    $listId: String!
  ) {
    createTask(taskInfo: $taskInfo, projId: $projId, listId: $listId) {
      project {
        ...projectFields
      }

      task {
        ...taskFields
      }
    }
  }
`

export const GQL_EDIT_TASK = gql`
  ${projectFields}

  mutation editTask($projId: String!, $taskId: String!, $newTask: TaskInput!) {
    editTask(projId: $projId, taskId: $taskId, task: $newTask) {
      project {
        ...projectFields
      }
      task {
        ...taskFields
      }
    }
  }
`

export const GQL_DELETE_TASK = gql`
  ${projectFields}

  mutation deleteTask($projId: String!, $taskId: String!) {
    deleteTask(projId: $projId, id: $taskId) {
      project {
        ...projectFields
      }
    }
  }
`

export const GQL_DRAG_TASK = gql`
  ${projectFields}

  mutation dragTask(
    $oldListId: String!
    $newListId: String!
    $newIndex: Int!
    $id: String!
    $newProgress: Int!
    $projectId: String!
  ) {
    dragTask(
      oldListId: $oldListId
      newListId: $newListId
      newIndex: $newIndex
      id: $id
      newProgress: $newProgress
      projectId: $projectId
    ) {
      task {
        ...taskFields
      }
      project {
        ...projectFields
      }
    }
  }
`
