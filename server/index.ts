import path from 'path'

import dotenv from 'dotenv'
import express from 'express'

import { errorLogger, errorResponder } from './errors/errorHandler'
import router from './router'

dotenv.config({ path: '../.env'})

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(router)
app.use(errorLogger, errorResponder)

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`)
})
