const express = require("express");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
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
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_HOST, // your frontend URL
  credentials: true,              // allow cookies and Authorization headers
}));
app.set('trust proxy', 1);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, // Better for security
  rolling: true,            // 💡 Refresh session on each request
  store: MongoStore.create({
    mongoUrl: process.env.DB_URI,
    ttl: 60, // Session TTL in seconds (optional; handled by cookie.maxAge too)
  }),
  cookie: {
    maxAge: 1 * 60 * 1000,   // 1 minute
    httpOnly: true,
    secure: process.env.ENV === "prod" ? true : false,           // true in production (with HTTPS)
    sameSite: process.env.ENV === "prod" ? 'none' : 'lax'
  }
}));
app.use(RequestHandler);
app.use(ResponseHandler);
app.use("/user", UserRoutes);
app.use(ErrorHandler);
app.listen(process.env.USER_MICROSERVICE_PORT, () => {
  console.log(`User Management Service running on http://localhost:${process.env.USER_MICROSERVICE_PORT}`);
});
