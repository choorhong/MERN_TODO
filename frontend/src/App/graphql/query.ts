export const getTasksQuery = `
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
