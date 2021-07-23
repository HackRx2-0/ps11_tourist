const express = require('express')
const app = express();
const api = require('./routers/api')
const server = require('http').Server(app)
const mongoose = require('mongoose')
const socketio = require('socket.io')
const cors = require('cors')
const config = require('./utils')

const corsOptions = {
  cors: true,
  origins: ["*"],
}

const PORT = config.app.PORT
const mongoUrl = config.db.DBSTR

mongoose.connect(mongoUrl, { useNewUrlParser: true })
  .then(() => console.log('connected to mongodb'))
  .catch((error) => console.log(error))

app.use(cors())
app.use(express.json())
app.use('/api', api)

const io = socketio(server, corsOptions)
// io.on('connection', (socket) => {
// 	console.log('new connection.....................')

// 	socket.on('disconnect', () => {
// 		const user = removeUser(socket.id)
// 		console.log(`${socket.id} connection closed.....................`)

// 		if (user) {
// 			io.to(user.room).emit('message', { user: 'admin', text: `${user.name} left` })
// 			io.to(user.room).emit('roomData', { room: user.name, users: getUsersInRoom(user.room) });
// 		}
// 		// for peer to peer
// 		// socket.to
// 	})

// 	socket.on('join', ({ name, room }, callback) => {
// 		const { error, user } = addUser({ id: socket.id, name, room })

// 		if (error) return callback(error)

// 		socket.emit('message', { user: 'admin', text: `${user.name} welcome to the room` })
// 		socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} joined` })

// 		socket.join(user.room)

// 		io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

// 		callback();
// 	})

// 	socket.on('sendMessage', (message, callback) => {
// 		const user = getUser(socket.id)
// 		io.to(user.room).emit('message', { user: user.name, text: message });
// 		callback()
// 	})

// })

io.use((skt, next) => {
  const username = skt.handshake.auth.name;
  if (!username) {
    return next(new Error("invalid username"));
  }
  skt.username = username;
  next();
})

io.on("connection", (socket) => {
  //We are looping over the io.of("/").sockets object, which is a Map of all currently connected Socket instances, indexed by ID.
  console.log(socket.id);

  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
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

  socket.on("imgMsg", (data) => {
    socket.to(data.to).emit("imgMsg", {
      img: true,
      type: data.type,
      buffer: data.buffer.toString("base64"),
      from: socket.id,
    });
  })
});


// server.listen(PORT, () => `Listening on PORT ${PORT}`)
server.listen(PORT, '192.168.1.40', () => console.log(`connected to server on PORT ${PORT}`))