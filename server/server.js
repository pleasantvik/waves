const express = require("express");
const passport = require("passport");
const { default: mongoose } = require("mongoose");
const xss = require("xss-clean");
const dotenv = require("dotenv");
const mongoSanitize = require("express-mongo-sanitize");
const routes = require("./routes");
const app = express();
const { handleError, converToApiError } = require("./middleware/ApiError");
const { jwtStrategy } = require("./middleware/passport");

dotenv.config({
  path: "./config.env",
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {})
  .then(() => console.log(`Connected to server successfully`));

app.use(express.json());
app.use(xss());

app.use(mongoSanitize());

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// Routes
app.use("/api", routes);
const PORT = process.env.PORT || 4000;

app.use(converToApiError);
app.use((err, req, res, next) => {
  handleError(err, res);
});
app.listen(PORT, () => console.log(`Listening at port ${PORT}`));

/**
 * dotenv.config({
  path: './config.env',
});
 */
