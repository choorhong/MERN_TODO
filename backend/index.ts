import express, { ErrorRequestHandler } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { graphqlHTTP } from 'express-graphql'

import cors from './middlewares/cors'
import graphqlSchema from './graphql/schema'
import graphqlResolvers from './graphql/resolvers'

import todoRoutes from './routes/todos'
import authRoutes from './routes/auth'

const handleError: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({ message: err.message, statusCode: err.statusCode })
}

// Initialize environmental variables
dotenv.config()
const { MONGO_URI, PORT } = process.env

// Initialize app
const app = express()

// Configure app
app.use(cors)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Configure Grapqhql
app.use('/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
  })
)

// Configure REST API routes
app.use('/todo', todoRoutes)
app.use('/auth', authRoutes)

// Configure Express fallback error handler
app.use(handleError)
// app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
//     res.status(500).json({ message: error.message })
// })

// Set up database & server
mongoose.connect(MONGO_URI!, { useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT)
  })
  .catch(err => {
    console.log('Mongoose error: ', err.message)
  })
