const { userService, authService } = require("../services");
const { ApiError } = require("../middleware/ApiError");
const httpStatus = require("http-status");

const usersController = {
  async profile(req, res, next) {
    try {
      const user = await userService.findUserById(req.user._id);

      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }
      //   res.json(user);
      res.json(res.locals.permission.filter(user._doc));
    } catch (error) {
      next(error);
    }
  },
  async updateProfile(req, res, next) {
    try {
      const user = await userService.updateUserProfile(req);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  //NOTE: We need to revalidate the user account and verify his token
  async updateUserEmail(req, res, next) {
    try {
      const user = await userService.updateUserEmail(req);
      const token = await authService.genAuthToken(user);

      // Send email to verify the account

      res.cookie("x-access-token", token).json({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = usersController;
