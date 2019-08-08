import gql from 'graphql-tag'

export type GQLExec = <T>(variables: T) => any

export const taskFields = gql`
  fragment taskFields on Task {
    points

    progress

    id
    dueDate
    startDate
    color
    subTasks {
      name
      completed
      id
    }
    security {
      public
      assignedUsers
    }
    recurrance {
      interval
      nextDue
    }
    comments {
      id
      comment
      dateAdded
      lastEdited
    }
    timeWorkedOn
    name
  }
`

export const profileFields = gql`
  fragment ProfileFields on Profile {
    id
    profileImg
    username
    email
    projects
  }
`

export const listFields = gql`
  fragment listFields on List {
    id
    name
    taskIds
  }
`

export const projectFields = gql`
  ${taskFields}
  ${listFields}
  fragment projectFields on Project {
    isPrivate
    ownerId
    lists {
      ...listFields
    }

    users
    tasks {
      ...taskFields
    }
    id
    name
  }
`

export const userFields = gql`
  ${projectFields}
  fragment userFields on User {
    id
    profileImg
    username
    email
    projects {
      ...projectFields
    }
  }
`
