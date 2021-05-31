import express, { ErrorRequestHandler }  from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { graphqlHTTP } from 'express-graphql'

import cors from './middlewares/cors'
import graphqlSchema from './graphql/schema'
import graphqlResolvers from './graphql/resolvers'

import todoRoutes from './routes/todos'
import User from './models/user'

const handleError: ErrorRequestHandler = (err, req, res, next) => {
    res.status(500).json({ message: err.message, statusCode: err.statusCode })
}

//Initialize environmental variables
dotenv.config()

const app = express()

app.use(cors);
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/graphql', 
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true,
    })
)

app.use(todoRoutes)

app.use(handleError)

// app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
//     res.status(500).json({ message: error.message })
// })

mongoose.connect(process.env.MONGO_URI!)
    .then(() => {
        app.listen(8000)
    })
    .catch(err => {
        console.log(`Mongoose error: `, err.message)
    })
