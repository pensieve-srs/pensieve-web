const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    is_email_on: { type: Boolean, default: false },
  },
  { timestamps: true },
);

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.getCleanUser = function(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    is_email_on: user.is_email_on,
  };
};

UserSchema.methods.generateToken = function(user) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 60 * 60 * 48, // expires in 48 hours
    },
  );
};

module.exports = mongoose.model("User", UserSchema);
