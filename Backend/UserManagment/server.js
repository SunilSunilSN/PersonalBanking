const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const UserRoutes = require("./Routes/UserRoutes");
const ResponseHandler = require("../SharedServices/Middlewares/ResponseHandler");
const RequestHandler = require("../SharedServices/Middlewares/RequestHandler");
const ErrorHandler = require("../SharedServices/Middlewares/ErrorHandler");
const connectDB = require("../SharedServices/Middlewares/DataBaseConnection");
console.log(`✅ Connected to MongoDB`);
require("../SharedServices/Environments/loadEnvironment")();
// mongoose
//   .connect(process.env.DB_URI, {})
//   .then(() => console.log(`✅ Connected to MongoDB: ${process.env.DB_NAME}`))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));
connectDB();
app.use(express.json());
app.use(cookieParser());
const maxAge = new Date(Date.now() + 30 * 60 * 1000)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: 1 * 60 * 1000, // **Session timeout (30 min)**
      expires: new Date(Date.now() + 1 * 60 * 1000),
      secure: false,
      httpOnly: true
  }
}));
app.use(RequestHandler);
app.use(ResponseHandler);
app.use("/user", UserRoutes);
app.use(ErrorHandler);
app.listen(process.env.USER_MICROSERVICE_PORT, () => {
  console.log(`User Management Service running on http://localhost:${process.env.USER_MICROSERVICE_PORT}`);
});
