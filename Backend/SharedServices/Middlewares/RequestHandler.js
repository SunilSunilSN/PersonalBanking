const PUBLIC_ROUTES = [
  "/user/getAllUser",
  "/user/userLogin",
  "/user/getCommonData",
  "/user/createUser",
  "/user/logout",
  "/accounts/getAllAccounts",
  "/user/getAPIConfig",
  "/user/WorkFlowCall",
  "/user/resendOTP"
];
//const ADMIN_ROUTES = ["/user/createUser"];
const ADMIN_ROUTES = [];
const jwt = require("jsonwebtoken");
const RolesHandler = require("./RolesHandlers");
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
    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized: Token Missing" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(400).json({
            success: false,
            message: "Session Expired, Please login Again",
          });
        }
        return res
          .status(403)
          .json({ success: false, message: "Unathorized: Invalid Token" });
      }

      req.user = decode;
      req.sessionData = session;
      if (ADMIN_ROUTES.includes(req.path)) {
        return RolesHandler("Admin")(req, res, next);
      } else {
        return RolesHandler("USER")(req, res, next);
      }
    });
  } catch (error) {
    console.log("Error:,", error);
    return res.status(500).json({
      success: false,
      message: "Somethin Went Wrong, Please try again later",
    });
  }
};
module.exports = RequestHandler;
