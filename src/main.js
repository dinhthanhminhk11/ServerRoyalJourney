import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Cate from './router/routercate'
import User from './router/routeruser'
import sleepingPlaces from './router/routerSleeping'
import Suplements from './router/routerSuplement'
import Product from './router/routerProduct'
import bathRoom from './router/routerbathroom.js'
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
app.use('/api', User)
app.use('/api', sleepingPlaces)
app.use('/api', Suplements)
app.use('/api', Product)
app.use('/api', bathRoom)
app.listen(process.env.PORT, () => {
  console.log(`connected port ${process.env.PORT}`)
})
