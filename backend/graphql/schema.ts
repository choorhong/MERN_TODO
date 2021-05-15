import { buildSchema } from 'graphql'

const graphqlSchema = buildSchema(`
    input PutTaskInput {
        id: String
        text: String
    }

    type Task {
        _id: String
        text: String
        creator: String
        updatedAt: String
        createdAt: String
    }

    type PutTaskResult {
        message: String
        task: Task
        tasks: [Task]
    }

    type DeleteTaskResult {
        message: String
    }

    type RootQuery {
        getSimpleTest: String
        getTasks: [Task]
    }

    type RootMutation {
        putTask(input: PutTaskInput): PutTaskResult
        deleteTask(id: String): DeleteTaskResult
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    
`)

export default graphqlSchema