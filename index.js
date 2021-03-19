const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const config =require('config')

app.use(express.json());
app.use('/test', async (req, res, next) => {
    res.status(200).send({ status: 200, message: "TEST API" })
});
mongoose.connect(config.get('DB_URL'), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }).then(
    (db) => console.log(`****************************************** MONGODB CONNECTED ***********************************************`),
    (err) => console.log("MongoDB " + String(err.message))
    );
app.listen(port, () => console.log(`Example app listening on port port!`))