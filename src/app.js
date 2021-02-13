
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const { NODE_ENV } = require("./config");
const validateBearerToken = require("./authorization");
const errorHandler = require("./handle-error");
const bookmarkRouter = require("./bookmark-router");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(validateBearerToken);
app.use("/api/bookmarks", bookmarkRouter);
app.use(errorHandler);

module.exports = app;