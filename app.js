const express = require("express");
const morgan = require("morgan");
const scholorshipRouter = require("./routes/scholorshipRouter");
const userRouter = require("./routes/userRouter");
const app = express();

//Middlewares

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());
// app.use(express.static(`${__dirname}`));

//Router

app.use("/api/v1/users", userRouter);
app.use("/api/v1/scholorships", scholorshipRouter);

module.exports = app;
