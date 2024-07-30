const express = require('express');
const db = require('./models');
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.use(express.json());

const pageRouter = require("./routes/page");
app.use("/", pageRouter);
const backRouter = require('./routes/back')
app.use('/api/colla', backRouter)



// 404

app.use("*", (req, res) => {
  res.status(404).send("페이지를 찾을 수 없습니다.");
});



db.sequelize.sync({ force: false}).then(() => {
    app.listen(PORT,() => {
        console.log(`http://localhost:${PORT}`);
    })
})
