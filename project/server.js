const express = require('express');
const db = require('./models');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
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



// 404

app.use("*", (req, res) => {
  res.status(404).send("페이지를 찾을 수 없습니다.");
});

//메신저 라우터
const messengerRouter = require('./routes/messenger');
app.use('/api/messenger', messengerRouter);

db.sequelize.sync({ force: false}).then(() => {
    app.listen(PORT,() => {
        console.log(`http://localhost:${PORT}`);
    })
})
