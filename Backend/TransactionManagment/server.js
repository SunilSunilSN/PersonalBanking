const express = require('express');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
const TransactionRoutes = require("./Routes/TransactionRoutes");
const ResponseHandler = require("../SharedServices/Middlewares/ResponseHandler");
const RequestHandler = require("../SharedServices/Middlewares/RequestHandler");
const ErrorHandler = require("../SharedServices/Middlewares/ErrorHandler");
const connectDB = require("../SharedServices/Middlewares/DataBaseConnection");
console.log(`✅ Connected to MongoDB`);
require("../SharedServices/Environments/loadEnvironment")();
connectDB();
app.use(express.json());
app.use(cookieParser());
const cors = require('cors');
app.use(cors({
  origin: "http://localhost:3005", // your frontend URL
  credentials: true,              // allow cookies and Authorization headers
}));
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
    secure: false,           // true in production (with HTTPS)
    sameSite: 'lax'
  }
}));
app.use(RequestHandler);
app.use(ResponseHandler);
app.use("/transaction", TransactionRoutes);
app.use(ErrorHandler);
app.listen(process.env.TRANSACTION_MICROSERVICE_PORT, () => {
  console.log(`Account Management Service running on http://localhost:${process.env.TRANSACTION_MICROSERVICE_PORT}`);
});
