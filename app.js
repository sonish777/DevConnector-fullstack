const express = require("express");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/AppError");
const errorController = require("./controllers/errorController");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const postRoutes = require("./routes/postRoutes");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/posts", postRoutes);

// SERVE STATIC ASSETS IN PRODUCTION

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.all("*", (req, res, next) => {
  console.log(req.url);
  return next(new AppError(404, "The route was not found !"));
});

app.use(errorController.errorHandler);

module.exports = app;
