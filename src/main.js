import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Cate from './router/routercate'
// import User from './router/routeruser'
const app = express()

app.use(express.json())
app.use(cors())

try {
  ;(async () => {
    await mongoose.connect(
        `mongodb+srv://admin:m123456@cluster0.lwode.mongodb.net/database_royalJourney?retryWrites=true&w=majority`
    )
    console.log('connected db ')
  })()
} catch (error) {
  console.log('connected failed')
}

app.use('/api', Cate)
// app.use('/api', User)
app.listen(process.env.PORT, () => {
  console.log(`connected port ${process.env.PORT}`)
})
