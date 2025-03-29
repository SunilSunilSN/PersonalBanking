const PUBLIC_ROUTES = ["/user/getAllUser3", "/user/register", "/user/userLogin"];
const jwt = require("jsonwebtoken");
const RequestHandler = (req, res, next) => {
  try {
    if (PUBLIC_ROUTES.includes(req.path)) {
        return next(); // Skip authentication for public routes
    }
    const session = req.session;
    const token = req.cookies?.token || req.headers["authorization"];
    if (!session) {
      return res.status(440).json({
        success: false,
        message: "Session expired. Please log in again.",
      });
    }
    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized: Token Missing" });
    }
    const SECRET_KEY = "your_secret_key";
    jwt.verify(token, SECRET_KEY, (err, decode) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(400)
            .json({
              success: false,
              message: "Session Expired, Please login Again",
            });
        }
        return res
          .status(403)
          .json({ success: false, message: "Unathorized: Invalid Toke" });
      }

      req.user = decode;
      req.sessionData = session;
      next();
    });
  } catch (error) {
    console.log("Error:,", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Somethin Went Wrong, Please try again later",
      });
  }
};
module.exports = RequestHandler;
