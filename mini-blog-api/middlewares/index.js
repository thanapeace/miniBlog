const jwt = require("jsonwebtoken");
const constants = require("../utils/constants");
const jwtSecret = constants.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};
