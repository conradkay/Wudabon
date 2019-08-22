import gql from 'graphql-tag'

export type GQLExec = <T>(variables: T) => any

export const userFields = gql`
  fragment userFields on User {
    id
    profileImg
    username
    email
  }
`
