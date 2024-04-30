const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// routes
const userRouter = require("./routes/userRoutes");
const errorHandler = require("./controller/errorHandler");

// global middleware
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(cors());
app.use(express.static("/public"));

app.use("/api/v1/users", userRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find the requested url ${req.originalUrl}`,
  });
});

app.use(errorHandler);

module.exports = app;
