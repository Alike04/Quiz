const { getUserById } = require("../services/userService");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

function authorize(roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return [
    async (req, res, next) => {
      try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token || token === null) {
          throw new ApiError(401, "Authenticate again");
        }
        const result = jwt.verify(token, process.env.SECRET);
        const { userId } = result;
        const user = await getUserById(userId);
        if (!user) {
          throw new ApiError(401, "Authentication is failed");
        }
        if (!roles.includes(user.role) && roles.length !== 0) {
          throw new ApiError(401, "You have no permission");
        }
        req.userData = user;
        next();
      } catch (e) {
        res.status(e.statsCode || 500).json({ message: e.message });
      }
    }
  ]
}

module.exports = authorize;
