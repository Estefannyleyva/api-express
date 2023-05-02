import mongoose from 'mongoose'
import express from 'express'
import * as dotenv from 'dotenv'
import kodersRouter from './routers/koders.router.js'

dotenv.config()

const {DB_USER, DB_PASSWORD, DB_NAME, DB_HOST} = process.env

const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

const server = express()

//middleware
server.use(express.json())

// Routers
server.use('/koders', kodersRouter)


mongoose.connect(URL) // regresa una promesa
    .then(async (connection)=> {
        console.log('Database connected :3')
        // iniciar el server - poner a escuchar
        server.listen(8080, () => {
            console.log('Server listening on port 8080')
        })
    })
    .catch((error) => console.log('Error: ', error))  

