const express = require('express')
const app = express();
const api = require('./routers/api')
const server = require('http').Server(app)
const mongoose = require('mongoose')
const socketio = require('socket.io')
const cors = require('cors')
const config = require('./utils')
const { Cred } = require("./models/credModel");
const corsOptions = {
  cors: true,
  origins: ["*"],
}

const PORT = config.app.PORT
const mongoUrl = config.db.DBSTR

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to mongodb'))
  .catch((error) => console.log(error))

app.use(cors())
app.use(express.json())
app.use('/api', api)


const findUser = async (email) => {
    let user = await Cred.findOne({ email });
    return user.user;
  }


const io = socketio(server, corsOptions)
 
io.use((skt, next) => {
  const type = skt.handshake.auth.type;
  const name = skt.handshake.auth.name;
  if (!name) {
    return next(new Error("invalid username"));
  }
  skt.type = type;
  skt.name = name;
  next();
})

io.on("connection", (socket) => {
  //We are looping over the io.of("/").sockets object, which is a Map of all currently connected Socket instances, indexed by ID.
  console.log(socket.id);
  
  

  const users = [];
  for (let [id,socket] of io.of("/").sockets) {
    users.push({
       userId: id,
      username: socket.name,
       type:socket.type
     });
  }
  console.log(users);
  socket.emit("online_users", users);
  //socket.broadcast.emit("user connected", ...) will emit to all connected clients, except the socket itself.
  socket.broadcast.emit("new_user", {
    userId: socket.id,
    username: socket.name,
    type: socket.type
  })

  socket.on("msg", ({ msg, to }) => {
    socket.to(to).emit("msg", {
      msg,
      from: socket.id,
    })
  })

  socket.on('offerOrAnswer', (data) => {
    console.log("offerOrAnswer => ", data);
    socket.to(data.to).emit("offerOrAnswer", {
      offer: data.offer,
    })

  })


  socket.on("candidate", data => {
    console.log("ice -> ", data);
    socket.broadcast.emit("candidate",{candidate : data.candidate})
  })

});


server.listen(5000, () => `Listening on PORT ${PORT}`)
//server.listen(PORT, '192.168.1.40', () => console.log(`connected to server on PORT ${PORT}`))