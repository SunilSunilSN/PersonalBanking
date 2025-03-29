const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
const UserRoutes = require("./Routes/UserRoutes");
const ResponseHandler = require("./Middlewares/ResponseHandler");
const RequestHandler = require("./Middlewares/RequestHandler");
const ErrorHandler = require("./Middlewares/ErrorHandler");
/// Should Make Dynamic Based on Environment//
const port = 3001;
const DB_NAME = "PersonalBanking";
const DB_URI = `mongodb://localhost:27017/${DB_NAME}`;

mongoose
  .connect(DB_URI, {})
  .then(() => console.log(`✅ Connected to MongoDB: ${DB_NAME}`))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(express.json());
app.use(cookieParser());
const maxAge = new Date(Date.now() + 30 * 60 * 1000)
app.use(session({
  secret: process.env.SESSION_SECRET || "your_session_secret",
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



// TESTING ENDPOINTS //
app.get("/", (req, res) => {
  res.json({ message: "List of users" });
});
app.get("/getUserName", (req, res) => {
  res.json({ message: "User Name is Sunil" });
});
app.listen(port, () => {
  console.log(`User Management Service running on http://localhost:${port}`);
});
