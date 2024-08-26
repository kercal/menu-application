const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("Token received in middleware:", token); // Log the token received

  if (!token) {
    console.log("No token provided. Authorization denied."); // Log if no token is provided
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded user from token:", decoded); // Log the decoded user info
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error); // Log token verification failure
    res.status(401).json({ message: "Token is not valid" });
  }
}

module.exports = authMiddleware;
