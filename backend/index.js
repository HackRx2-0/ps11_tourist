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


const findUser = async () => {
    let user = await Cred.findOne({ email: req.body.email });
    return user.user;
  }


const io = socketio(server, corsOptions)
 
io.use((skt, next) => {
  const email = skt.handshake.auth.email;
  if (!email) {
    return next(new Error("invalid username"));
  }
  skt.email = email;
  next();
})

io.on("connection", (socket) => {
  //We are looping over the io.of("/").sockets object, which is a Map of all currently connected Socket instances, indexed by ID.
  console.log(socket.id);
  const userId = findUser(socket.email);
  

  const users = [];
  for (let s of io.of("/").sockets) {
    console.log(s);
    // users.push({
    //   userId: ,
    //   username: socket.username,
    // });
  }
  socket.emit("users", users);
  //socket.broadcast.emit("user connected", ...) will emit to all connected clients, except the socket itself.
  socket.broadcast.emit("new user", {
    userID: socket.id,
    username: socket.username,
  })

  socket.on("msg", ({ msg, to }) => {
    socket.to(to).emit("msg", {
      msg,
      from: socket.id,
    })
  })

});


server.listen(5000, () => `Listening on PORT ${PORT}`)
//server.listen(PORT, '192.168.1.40', () => console.log(`connected to server on PORT ${PORT}`))