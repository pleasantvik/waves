const httpStatus = require("http-status");
const { ApiError } = require("../middleware/ApiError");
const User = require("../models/userModel");

//? : For filtering the field to update
const { filteredObj } = require("./utils");

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserById = async (id) => {
  return await User.findById(id);
};
const updateUserProfile = async (req) => {
  try {
    //NOTE: Version one
    // const user = await User.findOneAndUpdate(
    //   {
    //     _id: req.user._id,
    //   },
    //   {
    //     $set: { ...req.body.data },
    //   },
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // );

    // NOTE: version two
    // const user = await User.findByIdAndUpdate(
    //   req.user._id,
    //   { ...req.body },
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // );
    if (req.body.password || req.body.email) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "This route is not for updating password or email"
      );
    }

    // Filter out the field that user should not be able to upload
    const filteredBody = filteredObj(req.body, "firstname", "lastname");

    const user = await User.findByIdAndUpdate(req.user._id, filteredBody, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const updateUserEmail = async (req) => {
  try {
    //? Check if the email user is changing to doesn't exist in DB
    if (await User.emailTaken(req.body.email)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Sorry, email already exist on DB"
      );
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        email: req.body?.email,
        verified: false,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findUserByEmail,
  findUserById,
  updateUserProfile,
  updateUserEmail,
};
