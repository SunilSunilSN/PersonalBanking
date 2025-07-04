const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
require("../../SharedServices/Environments/loadEnvironment")();
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.UserName, role: user.UserRole },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );
};
const userLogin = async (req, res) => {
  try {
    const { UserName, Password } = req.body;
    const user = await UserModel.findOne({ UserName, Password });
    if (!user) {
      return res.error("Invalid Credentials", 401);
    }
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
    secure: process.env.ENV === "prod" ? true : false,           // true in production (with HTTPS)
    sameSite: process.env.ENV === "prod" ? 'none' : 'lax'
    });
    req.session.userId = user._id;
    req.session.loggedInAt = Date.now();
    req.session.save((err) => {
      if (err) {
        return res.error("Failed to save session", 500);
      }

      res.success("User Logged In", user, 200);
    });
  } catch (error) {
    res.error("User failed", 500);
  }
};
const createUser = async (req, res) => {
  try {
    const { UserName, Password, UserRole, ProfilePic, CIF } = req.body;
    if (!UserName || !Password || !UserRole) {
      return res.error("Missing required fields", 400);
    }
    const user = await UserModel.findOne({ UserName });
    if (user) {
      return res.error(`User With UserName: ${UserName} Already Exists!`, 400);
    }
    const newUser = await UserModel.create({
      UserName,
      Password,
      UserRole,
      ProfilePic,
      CIF
    });
    return res.success("User Created Succesfully", newUser, 201);
  } catch (error) {
    return res.error(error.message, 500);
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (users.length == 0) {
      return res.error("No User Found", 400);
    }
    return res.success("User Fetched Successfully", users, 201);
  } catch (error) {
    return res.error("User Fetch Failed", 500);
  }
};

const getDashboard = async (req, res) => {
  try {
    return res.success("User Fetched Successfully", "Sunil", 200);
  } catch (error) {
    return res.error("User Fetch Failed", 500);
  }
};

const userLogout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Logout failed", error: err.message });
      } else {
        res.clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });
        res.success("User logged out successfully", 200);
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};
module.exports = {
  createUser,
  getAllUser,
  userLogin,
  getDashboard,
  userLogout,
};
