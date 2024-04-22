const express = require("express");

const app = express();



app.all("*", (req, res) => {
    res.status(404).json({
        status: "fail",
        message: `Can't find the requested url ${req.originalUrl}`
    })
})

module.exports = { app };
