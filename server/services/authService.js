// SERVICES; A JS file where we put reusable function
const User = require("../models/userModel");
const httpStatus = require("http-status");
const { ApiError } = require("../middleware/ApiError");

const userService = require("./userService");

const createUser = async (req) => {
  try {
    //?. emailTaken is a static method available on the User
    if (await User.emailTaken(req.email)) {
      console.log("User email alreadytaken");

      throw new ApiError(httpStatus.BAD_REQUEST, " Sorry email taken");
      // throw error;
    }
    const user = User.create(req);

    return user;
  } catch (error) {
    throw error;
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    const user = await userService.findUserByEmail(email);

    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Sorry bad email");
    }

    if (!(await user.comparePassword(password))) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Sorry bad email or password"
      );
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const genAuthToken = (user) => {
  const token = user.generateAuthToken();

  return token;
};

module.exports = {
  createUser,
  genAuthToken,
  signInWithEmailAndPassword,
};
