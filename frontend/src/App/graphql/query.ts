import gql from 'graphql-tag'

export const getTasksQuery = gql`
  query getTasks {
    getTasks {
      _id
      text
      creator
      updatedAt
      createdAt
    }
  }
`
