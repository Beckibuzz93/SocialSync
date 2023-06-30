const express = require('express');
const cors = require('cors');
const logger = require('morgan')

const eventsRouter = require('./routers/events');
const userRouter = require('./routers/users')

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'))

app.get("/", (req, res) => {
    res.json({
        name: "SocialSync",
        description: "View and post events in your local community"
    })
})

app.use("/events", eventsRouter);
app.use("/users", userRouter);

module.exports = app;
