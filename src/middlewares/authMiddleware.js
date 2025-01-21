const { verifyToken } = require("../utils/jwtHelper");

const authenticate = (req, res, next) => {
  let Authorization = req.header("Authorization");
  if (!Authorization || !Authorization.startsWith("Bearer") || !Authorization.split(" ")[1])
    return res.status(401).json({ message: "No token, authorization denied" });

  const token = Authorization.split(" ")[1];

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    console.log("decoded............", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authenticate;
