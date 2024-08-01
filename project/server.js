const express = require('express');
const db = require('./models');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
// const socketIo = require('socket.io');
const http = require('http');
const { v4: uuidv4 } = require('uuid');

const PORT = 8000;

app.set("view engine", "ejs");
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const pageRouter = require("./routes/page");
app.use("/", pageRouter);
const backRouter = require('./routes/back')
app.use('/api/colla', backRouter)
//메신저 라우터
const messengerRouter = require('./routes/messenger');
app.use('/api/messenger', messengerRouter);


// 404

app.use("*", (req, res) => {
  res.status(404).send("페이지를 찾을 수 없습니다.");
});

/**
 * 채팅 소켓
 */
//http 서버 연결
//const server = http.createServer(app);
//웹소켓과 서버 연결
//const io = socketIo( server );
// const wss = new ws.Server({ port: 8080 });

//때 사용한 코드
//사용자 정보를 갱신해주
//속닥속닥 할는 함수
// function getUserList(room) {
//   //room에 접속한 모든 사용자
//   const users = [];
//   //console.log(io.sockets);
//   //채팅룸에 접속한 socket.id값을 찾음
//   const clients = io.sockets.adapter.rooms.get(room);
//   //console.log(clients);
//   if (clients) {
//       clients.forEach((client) => {
//           console.log('client', client);
//           //io.sockets.sockets: socket.id가 할당한 변수들의 객체값
//           const userSocket = io.sockets.sockets.get(client);
//           const info = { userName: userSocket.userName, key: client };
//           users.push(info);
//       });
//   }
//   return users;
// }

// const users = {};  // 사용자 목록
// const rooms = {};  // 채팅방 목록

// io.on('connection', function connection(socket) {
//   const userId = uuidv4();
//   console.log("uuidv4값 확인 : ", userId);
//   users[userId] = socket;
//   socket.userId = userId;

//   socket.emit(JSON.stringify({ type: 'welcome', userId }));

//   io.on('message', function incoming(message) {
//     const data = JSON.parse(message);

//     if (data.type === 'createRoom') {
//       const otherUserId = data.otherUserId;
//       if (users[otherUserId]) {
//         const roomId = uuidv4();
//         rooms[roomId] = [ws, users[otherUserId]];

//         ws.roomId = roomId;
//         users[otherUserId].roomId = roomId;

//         ws.send(JSON.stringify({ type: 'roomCreated', roomId }));
//         users[otherUserId].send(JSON.stringify({ type: 'roomCreated', roomId }));
//       } else {
//         ws.send(JSON.stringify({ type: 'error', message: 'User not found' }));
//       }
//     } else if (data.type === 'addUser') {
//       const newUserId = data.newUserId;
//       const roomId = ws.roomId;
//       if (users[newUserId] && rooms[roomId]) {
//         rooms[roomId].push(users[newUserId]);
//         users[newUserId].roomId = roomId;
//         users[newUserId].send(JSON.stringify({ type: 'roomAdded', roomId }));
//         ws.send(JSON.stringify({ type: 'userAdded', newUserId }));
//       } else {
//         ws.send(JSON.stringify({ type: 'error', message: 'User or room not found' }));
//       }
//     } else if (data.type === 'message') {
//       const roomId = ws.roomId;
//       if (rooms[roomId]) {
//         rooms[roomId].forEach(client => {
//           if (client !== ws && client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify({ type: 'message', content: data.content }));
//           }
//         });
//       }
//     }
//   });

//   io.on('close', () => {
//     const roomId = io.roomId;
//     if (roomId && rooms[roomId]) {
//       rooms[roomId] = rooms[roomId].filter(client => client !== io);
//       if (rooms[roomId].length === 0) {
//         delete rooms[roomId];
//       }
//     }
//     delete users[userId];
//   });
// });



db.sequelize.sync({ force: false}).then(() => {
    app.listen(PORT,() => {
        console.log(`http://localhost:${PORT}`);
    })
})
