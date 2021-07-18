import express, { ErrorRequestHandler } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { graphqlHTTP } from 'express-graphql'

import cors from './middlewares/cors'
import graphqlSchema from './graphql/schema'
import graphqlResolvers from './graphql/resolvers'
import { verifyToken } from './middlewares/auth'

import todoRoutes from './routes/todos'
import authRoutes from './routes/auth'

const handleError: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({ message: err.message, statusCode: err.statusCode })
}

// Initialize environmental variables
dotenv.config()
const { MONGO_URI, MONGO_DB, PORT } = process.env

// Initialize app
const app = express()

// Configure app
app.use(cors)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Configure Grapqhql
// Signup, login, reset-password will not use graphql as verifyToken will fail
app.use(
  '/graphql',
  verifyToken,
  (req, res, next) =>
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: graphqlResolvers,
      graphiql: true,
      context: {
        req,
        res,
        next
      }
    })(req, res)
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
if (!MONGO_URI || !MONGO_DB) throw 'DB UNDEFINED'
mongoose.connect(`${MONGO_URI}/${MONGO_DB}`, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log('Listening on Port', PORT)
    app.listen(PORT)
  })
  .catch(err => {
    console.log('Mongoose error: ', err.message)
  })
