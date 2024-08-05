const express = require('express');
const db = require('./models');
const app = express();
const PORT = 8000;
// const aws = require('aws-sdk')
// const multer = require('multer')
// const multerS3 = require('multer-s3')

const socketIo = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIo(server);
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());



//aws 설정
// aws.config.update({
//     accessKeyId: process.env.ACCESSKEY,
//     secretAccessKey: process.env.SECRETKEY,
//     region : 'ap-northeast-2'
// })
//aws s3인스턴스 생성
// const s3 = new aws.S3()
// //multer 설정
// const upload = multer({
//     storage: multerS3({
//         s3, //s3:s3
//         bucket: process.env.BUCKET,
//         acl : 'public-read', //파일 접근권한 (public-read로 해야 업로드 된 파일이 공개)
//         metadata: function(req,file,cb){
//             cb(null,{fieldName: file.fieldname})
//         },
//         key: function(req,file,cb){
//             cb(null,Date.now().toString()+'-'+file.originalname)
//         }
//     })
// })
const pageRouter = require("./routes/page");
app.use("/", pageRouter);
//api 라우터
const backRouter = require('./routes/back')
app.use('/api/colla', backRouter)



/** 1. 소켓 연결 */
io.on('connection', (socket) => {
  console.log('a user connected');

//   /** 1. 내 소켓 아이디 저장.*/
  // socket.on('login', );

//   /** 2. 방 입장 */
  socket.on('join chat', (chat) => {
    //join : 방 없으면 생성, 있으면 입장
      socket.join(chat);
      socket.chat = chat;
      console.log(chat);
      
      console.log(`User joined room: ${chat}`);
  });


//   /** 3. 룸 내 메세지 브로드캐스트*/
  socket.on('chat message', (arg) => {
    const {username, value} = arg;
    console.log("server: ", username, value);
    
    io.to(socket.chat).emit('chat message', {username, value});
  });

  
//   /** 4. socket 방 초대 */
  socket.on('invite chat', (username, chat) => {
    usersocket = username.socket.id;
    if(usersocket) {
      usersocket.join(chat);
      usersocket.emit('invited', chat);
      console.log(`User ${username} invited to chat ${chat}`);
    }
  });

// //   /** 5. 로그아웃 : 소켓 연결 해제 */
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//     })
//   });

})

// 404
app.use("*", (req, res) => {
  res.status(404).send("페이지를 찾을 수 없습니다.");
});
db.sequelize.sync({ force: false}).then(() => {
    server.listen(PORT,() => {
        console.log(`http://localhost:${PORT}`);
    })
})