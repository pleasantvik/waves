// const passport = require("passport");
const User = require("../models/userModel");
const dotenv = require("dotenv");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

dotenv.config({
  path: "./config.env",
});

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
