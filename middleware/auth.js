const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      success: false,
      error: "Ingen token!",
    });
  }
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    const tokenDecoded = jwt.verify(token, "superdupersecretpassword");
    req.userId = tokenDecoded.userId;
    req.token = token;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Ogiltig token!",
    });
  }
};

module.exports = auth;
