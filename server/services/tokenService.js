const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id,
      role: user.role
    },
    process.env.SECRET,
    {
      expiresIn: "10h",
    }
  );
  return token;
};

module.exports = { generateToken };