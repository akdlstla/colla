const express = require('express');
const db = require('./models');
const app = express();
const PORT = 8000;





db.sequelize.sync({ force: false}).then(() => {
    app.listen(PORT,() => {
        console.log(`http://localhost:${PORT}`);
    })
})
