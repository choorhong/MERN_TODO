import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import cors from './middlewares/cors'
import todoRoutes from './routes/todos'
import User from './models/user'

//Initialize environmental variables
dotenv.config()

const app = express()

app.use(cors);
  
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(todoRoutes)

mongoose.connect(process.env.MONGO_URI!)
    .then(() => {
        app.listen(8000)
    })
    .catch(err => {
        console.log(`Mongoose error: `, err.message)
    })
