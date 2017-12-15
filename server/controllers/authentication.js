const User = require("../models/user");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const isValidEmail = email => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const signupUser = (req, res) => {
  const name = req.body.name.trim();
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  if (!isValidEmail(email)) {
    return res.status(400).json({
      error: true,
      type: "invalid_email",
      message: "Invalid email",
    });
  }

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return res.send(err);
    }

    if (user) {
      return res.status(400).json({
        error: true,
        type: "email_taken",
        message: "Email is already taken",
      });
    }

    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = newUser.generateHash(password);

    newUser.save((err, user) => {
      if (err) {
        return res.send(err);
      }

      res.status(200).json({
        user: user.getCleanUser(user),
        token: user.generateToken(user),
      });
    });
  });
};

const loginUser = (req, res) => {
  const email = req.body.email.trim();

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return res.send(err);
    }

    if (!user) {
      return res.status(404).json({
        error: true,
        type: "user_not_found",
        message: "No user found with that email and password",
      });
    }

    if (!user.validPassword(req.body.password.trim())) {
      return res.status(400).json({
        error: true,
        type: "invalid_password",
        message: "No user found with that email and password",
      });
    }

    res.json({
      user: user.getCleanUser(user),
      token: user.generateToken(user),
    });
  });
};

const getSelf = (req, res) => {
  const token = req.body.token || req.query.token;

  if (!token) {
    return res.status(401).json({
      error: true,
      type: "invalid_token",
      message: "Must include token",
    });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      throw err;
    }

    res.json({
      user: user.getCleanUser(user),
      token: token, // could renew token here
    });
  });
};

const authenticateUser = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({
      error: true,
      type: "invalid_token",
      message: "Invalid authentication. Please include a JWT token",
    });
  }

  token = token.replace("Bearer ", "");

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(401).json({
        error: true,
        type: "invalid_token",
        message: "Invalid authentication. Please log in to make requests",
      });
    }

    req.user = user;
    next();
  });
};

module.exports = {
  signupUser,
  loginUser,
  getSelf,
  authenticateUser,
};
