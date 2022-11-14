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
import message from './router/routerMessage'
import Order from './router/routerorder'
import socket from 'socket.io'
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
app.use('/api/Message',message)
app.use('/api', Order)
const server =  app.listen(process.env.PORT, () => {
  console.log(`connected port ${process.env.PORT}`)
})
const io = socket(server, {
  cors: {
    origin: 'http://localhost:4200',
    credentials: true,
  },
})
let activeUser = new Map()
let activeUserOrder = new Map()

io.on("connection",socket=> {
  socket.on('hostIp', (id) => {
    activeUserOrder.set(id, socket.id)
  })
  socket.on('confirmOrder', (data) => {
    const room = activeUserOrder.get(data.idUser)
    io.to(room).emit('confirmres', {
      IdOder: data.idOder,
      status: data.status,
      IdUser: data.idUser,
      IdHost: data.idHost,
      IdPro: data.idProduct,
    })
  })
  socket.on('cancelOrder', (data) => {
    const room = activeUserOrder.get(data.IdHost)
    io.to(room).emit('cancelres', {
      IdOder: data.idOder,
      status: data.status,
      IdUser: data.idUser,
      IdHost: data.idHost,
      IdPro: data.idProduct,
    })
  })

  socket.on('sendorder', (data) => {
    const room = activeUserOrder.get(data.IdHost)
    io.to(room).emit('orderresponse', {
      idUser: data.IdUser,
      IdOder: data.IdOder,
      IdHost: data.IdHost,
    })
  })
  socket.on('join', (id) => {
    activeUser.set(id, socket.id)
    io.emit('join', {
      id: id
    })
    console.log("user:   "+id)
  })
  socket.on('message', (data) => {
    const room = activeUser.get(data.room)
    io.to(room).emit('new message', {
      sender: data.sender,
      message: data.message,
    })
    console.log(data)
  })
  socket.on('statusMessage', (data) => {
    const room = activeUser.get(data.sendTo)
    io.to(room).emit('statusMsg', {
      data,
    })
  })
  socket.on('sendNotification', (data) => {
    const room = activeUser.get(data.sendTo)
    io.to(room).emit('Notification', {
      data,
    })
  })
  socket.on('statusUser', (data) => {
    for (const item of activeUser.entries()) {
      if (item[0] !== data._id) {
        io.to(item[1]).emit('activeStatus', {
          data,
        })
      }
    }
  })
  socket.on('disconnectUser', (data) => {
    for (const item of activeUser.entries()) {
      if (item[0] !== data._id) {
        io.to(item[1]).emit('activeStatus', {
          data,
        })
      }
    }
  })
  socket.on('disconnect', () => {
    for (const item of activeUser.entries()) {
      if (item[1] == socket.id) {
        activeUser.delete(item[0])
      }
    }
  })
})


