const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.auth = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token) throw new Error("Unauthenticated");
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email });
    if (!user) throw new Error("Unautheticated");

    res.locals.user = user;

    return next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
