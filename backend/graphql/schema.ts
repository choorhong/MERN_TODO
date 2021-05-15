import { buildSchema } from 'graphql'

const graphqlSchema = buildSchema(`
    input PostTaskInput {
        text: String
    }

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

    type PostTaskResult {
        message: String
        tasks: [Task]
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
        postTask(input: PostTaskInput!): PostTaskResult
        putTask(input: PutTaskInput): PutTaskResult
        deleteTask(id: String): DeleteTaskResult
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    
`)

export default graphqlSchema