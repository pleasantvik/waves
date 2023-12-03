const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({
  path: "config.env",
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  roles: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  firstname: {
    type: String,
    required: true,
    maxLength: 50,
    trim: true,
    default: "John",
  },
  lastname: {
    type: String,
    required: true,
    maxLength: 50,
    trim: true,
    default: "Doe",
  },
  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

console.log(process.env.JWT_SECRET);

//? NOTE: Generate token
userSchema.methods.generateAuthToken = async function () {
  let user = this;
  const userObj = { sub: user._id.toHexString() };
  const token = jwt.sign(userObj, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

//? NOTE: Hashing Password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
  }

  next();
});

userSchema.statics.emailTaken = async function (email) {
  const user = await this.findOne({ email });

  return !!user;
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;

  const isMatch = await bcrypt.compare(candidatePassword, user.password);

  return isMatch;
};

const User = mongoose.model("User", userSchema);

// User.createIndexes({
//   email: 1,
//   unique: true,
// });

module.exports = User;
