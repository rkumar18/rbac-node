


























mongoose.connect(config.get('DB_URL'), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }).then(
    (db) => console.log(`****************************************** MONGODB CONNECTED ***********************************************`),
    (err) => console.log("MongoDB " + String(err.message))
);
app.use(express.json());
app.use('/test', async (req, res, next) => {
    res.status(200).send({ status: 200, message: "TEST API" })
});