export const putTaskMutation = `
  mutation putTask ($input: PutTaskInput) {
    putTask(input: $input) {
      message
      tasks {
        _id
        text
        creator
        updatedAt
        createdAt
      }
    }
  }
`

export const deleteTaskMutation = `
  mutation deleteTask($id: String){
    deleteTask(id: $id) {
      message
    }
  }
`
